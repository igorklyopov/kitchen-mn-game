import { GameObject } from './GameObject.js';
import { Vector2 } from './Vector2.js';
import { Sprite } from './Sprite.js';
import { events } from './Events.js';
import { ACTIONS_NAMES, MOVING_STEP, GRID_SIZE } from '../data/constants.js';
import { assetsData } from '../data/assetsData.js';
import { paveWayForward } from '../helpers/paveWayForward.js';
import { collisionBoundaries } from '../helpers/collisionBoundaries.js';
import { findAssetByName } from '../utils/findAssetByName.js';
import { isRectanglesCollide } from '../utils/isRectanglesCollide.js';
// import { checkIsAtDestinationPosition } from '../helpers/checkIsAtDestinationPosition.js';

const {
  WALK_UP,
  WALK_DOWN,
  WALK_LEFT,
  WALK_RIGHT,
  STAND_UP,
  STAND_DOWN,
  STAND_LEFT,
  STAND_RIGHT,
} = ACTIONS_NAMES;

const heroSpriteData = findAssetByName(assetsData, 'hero');
const standActionsList = [STAND_UP, STAND_DOWN, STAND_LEFT, STAND_RIGHT];
const walkActionsList = [WALK_UP, WALK_DOWN, WALK_LEFT, WALK_RIGHT];

/// ////////// data for test ///////////////
const data1 = [
  { action: 'STAND_UP', time: 3000 },
  { action: 'WALK_UP', distance: 3 },
  { action: 'STAND_UP', time: 3000 },
  { action: 'WALK_UP', distance: 15 },
  { action: 'STAND_UP', time: 5000 },
  { action: 'WALK_RIGHT', distance: 6 },
  { action: 'WALK_DOWN', distance: 3 },
  { action: 'STAND_DOWN', time: 3000 },
];
// const data2 = [
//   { action: 'STAND_UP', time: 3000 },
//   { action: 'WALK_UP', distance: 3 },
//   { action: 'WALK_RIGHT', distance: 6 },
//   { action: 'WALK_DOWN', distance: 3 },
//   { action: 'WALK_LEFT', distance: 6 },
//   { action: 'WALK_UP', distance: 3 },
// ];
/// ///////////////////////////////////////

class Character extends GameObject {
  constructor({
    name = 'character',
    x = 0,
    y = 0,
    isPlayerControlled = false,
  }) {
    super({
      name,
      position: new Vector2(x, y),
    });

    this.body = new Sprite({
      imageSrc: heroSpriteData.src,
      frameX: heroSpriteData.animations.standUp.frameX,
      frameY: heroSpriteData.animations.standUp.frameY,
      frameSize: heroSpriteData.frameSize,
      frameXMaxNumber: heroSpriteData.maxNumberOfFramesAlongX,
      frameYNumber: heroSpriteData.numberOfFramesAlongY,
      animations: heroSpriteData.animations,
      position: this.position,
      name: this.name,
    });
    this.addChild(this.body);

    this.isPlayerControlled = isPlayerControlled; // flag for hero role
    this.destinationPosition = this.position.duplicate();
    this.speed = MOVING_STEP; // the number of squares the hero moves at one time
    this.moveDistance = GRID_SIZE; // the size of square (distance) the hero moves at one time
    this.isCollide = false;
    this.isAutoActionPlay = false;
    this.actions = {
      repeat: false,
      data: data1,
    };
    this.actionDataIndex = 0;
    this.frameTimer = 0;
  }

  step(delta, root) {
    this.updateMove(delta, root);
  }

  tryEmitPosition() {
    if (this.lastX === this.position.x && this.lastY === this.position.y) {
      return;
    }
    this.lastX = this.position.x;
    this.lastY = this.position.y;
    if (this.isPlayerControlled) events.emit('HERO_POSITION', this.position);
  }

  set autoActions(actionsData = { repeat: false, data: [] }) {
    this.actions = actionsData;
  }

  get autoActions() {
    return this.actions;
  }

  incrementActionDataIndex() {
    if (this.actionDataIndex < this.actions.data.length - 1)
      this.actionDataIndex += 1;
  }

  resetActionDataIndex() {
    this.actionDataIndex = 0;
  }

  generateAction(delta) {
    const currentAction = this.actions.data[this.actionDataIndex].action;
    const currentDistance = this.actions.data[this.actionDataIndex].distance;
    const timeToNextAction = this.actions.data[this.actionDataIndex].time;
    const isWayForwardPaved = this.checkWayForwardIsPaved();

    const isArrived =
      this.destinationPosition.x === this.position.x &&
      this.destinationPosition.y === this.position.y;

    if (currentDistance) {
      this.moveDistance *= currentDistance;
    }

    if (timeToNextAction) {
      if (this.frameTimer > timeToNextAction) {
        this.frameTimer = 0;
        this.incrementActionDataIndex();
      } else {
        this.frameTimer = Math.floor(this.frameTimer + delta);
      }
    } else if (standActionsList.includes(currentAction)) {
      this.incrementActionDataIndex();
    }

    if (
      walkActionsList.includes(currentAction) &&
      isArrived &&
      isWayForwardPaved
    ) {
      this.incrementActionDataIndex();
    } else {
      this.moveDistance = GRID_SIZE;
    }

    const isEndOfAutoActionsList =
      this.actionDataIndex === this.actions.data.length - 1;

    if (this.actions.repeat && isEndOfAutoActionsList)
      this.resetActionDataIndex();

    return currentAction;
  }

  animateAction(action = '', delta) {
    switch (action) {
      case STAND_LEFT:
        this.body.playAnimation({ animationName: 'standLeft' });
        return;

      case STAND_RIGHT:
        this.body.playAnimation({ animationName: 'standRight' });
        return;

      case STAND_UP:
        this.body.playAnimation({ animationName: 'standUp' });
        return;

      case STAND_DOWN:
        this.body.playAnimation({ animationName: 'standDown' });
        return;

      case WALK_DOWN:
        this.body.playAnimation({
          animationName: 'walkDown',
          deltaTime: delta,
        });
        break;

      case WALK_UP:
        this.body.playAnimation({ animationName: 'walkUp', deltaTime: delta });
        break;

      case WALK_LEFT:
        this.body.playAnimation({
          animationName: 'walkLeft',
          deltaTime: delta,
        });
        break;

      case WALK_RIGHT:
        this.body.playAnimation({
          animationName: 'walkRight',
          deltaTime: delta,
        });
        break;

      default:
        // eslint-disable-next-line no-useless-return
        return;
    }
  }

  checkIsSpaceFree(nextX, nextY, collisionBoundaries) {
    // Validating that the next destination is free
    this.isSpaceFree = true;

    const rectA = {
      position: { x: nextX, y: nextY },
      width: this.body.frameSize.width / 2,
      height: this.body.frameSize.height / 2,
    };

    for (let i = 0; i < collisionBoundaries.length; i += 1) {
      const boundary = collisionBoundaries[i];
      const rectB = {
        position: boundary.position,
        width: boundary.width / 2,
        height: boundary.height / 2,
      };

      if (isRectanglesCollide(rectA, rectB)) {
        this.isSpaceFree = false;

        break;
      }
    }

    return this.isSpaceFree;
  }

  move(moveAction = '') {
    let nextX = this.destinationPosition.x;
    let nextY = this.destinationPosition.y;

    switch (moveAction) {
      case WALK_DOWN:
        nextY += this.moveDistance * this.speed;
        break;

      case WALK_UP:
        nextY -= this.moveDistance * this.speed;
        break;

      case WALK_LEFT:
        nextX -= this.moveDistance * this.speed;
        break;

      case WALK_RIGHT:
        nextX += this.moveDistance * this.speed;
        break;

      default:
    }

    const isSpaceFree = this.checkIsSpaceFree(
      nextX,
      nextY,
      collisionBoundaries,
    );

    if (isSpaceFree) {
      this.isCollide = false;
      this.destinationPosition.x = nextX;
      this.destinationPosition.y = nextY;
    } else {
      this.isCollide = true;
    }
  }

  checkWayForwardIsPaved() {
    const distance = paveWayForward(this, this.destinationPosition, this.speed);

    return distance <= 1;
  }

  updateMove(delta, root) {
    const { input } = root;
    const isWayForwardPaved = this.checkWayForwardIsPaved();

    const action = this.isAutoActionPlay
      ? this.generateAction(delta)
      : input.action;

    if (isWayForwardPaved) {
      this.move(action);

      const actionForAnimation = this.isCollide
        ? this.getStopAction(action)
        : action;

      this.animateAction(actionForAnimation, delta);
    }

    this.tryEmitPosition();
  }

  getStopAction(moveAction = '', delta) {
    switch (moveAction) {
      case WALK_LEFT:
        return STAND_LEFT;

      case WALK_RIGHT:
        return STAND_RIGHT;

      case WALK_UP:
        return STAND_UP;

      case WALK_DOWN:
        return STAND_DOWN;

      default:
        return moveAction;
    }
  }
}

export { Character };
