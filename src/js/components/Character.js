import { GameObject } from './GameObject.js';
import { Vector2 } from './Vector2.js';
import { Sprite } from './Sprite.js';
import { events } from './Events.js';
import { FrameTimer } from './FrameTimer.js';
import {
  ACTIONS_NAMES,
  MOVEMENT_STEPS_NUMBER,
  GAME_GRID_CELL_SIZE,
} from '../data/constants.js';
import { paveWayForward } from '../helpers/paveWayForward.js';
import { gameMap } from '../helpers/collisionBoundaries.js';
import { isRectanglesCollide } from '../utils/isRectanglesCollide .js';

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

const standActionsList = new Set([
  STAND_UP,
  STAND_DOWN,
  STAND_LEFT,
  STAND_RIGHT,
]);
const walkActionsList = new Set([WALK_UP, WALK_DOWN, WALK_LEFT, WALK_RIGHT]);

class Character extends GameObject {
  constructor({
    name = 'character',
    position = { x: 0, y: 0 },
    isPlayerControlled = false,

    // sprite options
    imageSrc,
    frameX,
    frameY,
    frameSize,
    frameXMaxNumber,
    frameYNumber,
    animations,
    scale,
  }) {
    super({
      name,
      position: new Vector2(position.x, position.y),
    });

    this.body = new Sprite({
      imageSrc,
      frameX,
      frameY,
      frameSize,
      frameXMaxNumber,
      frameYNumber,
      animations,
      scale,
      position: this.position,
      name: this.name,
    });
    this.addChild(this.body);

    this.isPlayerControlled = isPlayerControlled; // flag for character role
    this.destinationPosition = this.position.duplicate();
    this.movementStepsNumber = MOVEMENT_STEPS_NUMBER; // the number of squares (grid cells, tiles of map grid) the character moves at one time
    this.movingStepSize = GAME_GRID_CELL_SIZE; // the size of square (distance) the character moves at one time
    this.isCollide = false;
    this.isAutoActionPlay = false;
    this.actions = {
      repeat: false,
      data: [],
    };
    this.actionDataIndex = 0;
    this.frameTimer = new FrameTimer();
    this.movingStepsCounter = 0;

    this.heroPosition = null;
    if (!this.isPlayerControlled) {
      events.on(
        'HERO_POSITION',
        this,
        (heroPosition) => (this.heroPosition = heroPosition),
      );
    }

    this.text = 'Hello everyone!';
  }

  set movementSteps(stepsNumber) {
    this.movementStepsNumber = stepsNumber;
  }

  get movementSteps() {
    return this.movementStepsNumber;
  }

  set autoActions(actionsData) {
    this.actions = actionsData;
  }

  get autoActions() {
    return this.actions;
  }

  set autoActionsPlay(value) {
    this.actions = value;
  }

  get autoActionsPlay() {
    return this.isAutoActionPlay;
  }

  set message(text) {
    this.text = text;
  }

  get message() {
    return this.text;
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

  incrementActionDataIndex() {
    if (this.actionDataIndex < this.actions.data.length)
      this.actionDataIndex += 1;
  }

  resetActionDataIndex() {
    this.actionDataIndex = 0;
  }

  generateAction(delta) {
    const { data } = this.actions;
    const currentAction = data[this.actionDataIndex].action;
    const currentDistance = data[this.actionDataIndex].distance;
    const timeToNextAction = data[this.actionDataIndex].time;
    const isWayForwardPaved = this.checkWayForwardIsPaved();

    const isArrived =
      this.destinationPosition.x === this.position.x &&
      this.destinationPosition.y === this.position.y;

    if (timeToNextAction) {
      this.frameTimer.setTime(timeToNextAction);
      this.frameTimer.setCallback(() => this.incrementActionDataIndex());
      this.frameTimer.start(delta);
    } else if (standActionsList.has(currentAction)) {
      this.incrementActionDataIndex();
    }

    if (walkActionsList.has(currentAction) && isArrived && isWayForwardPaved) {
      if (currentDistance && this.movingStepsCounter < currentDistance) {
        this.movingStepsCounter += 1;
      }

      if (this.movingStepsCounter === currentDistance) {
        this.movingStepsCounter = 0;
        this.incrementActionDataIndex();
      }
    }

    const isEndOfAutoActionsList =
      this.actionDataIndex === this.actions.data.length;

    if (this.actions.repeat && isEndOfAutoActionsList) {
      this.resetActionDataIndex();
    }

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

  // divides the character`s body into squares equal to the map grid cell and turns their coordinates into map grid cell numbers along the x- and y-axis (for checking on the map whether the space is free)
  normalizeCoordinates(nextX, nextY) {
    const squareX = nextX / this.movingStepSize;
    const squareY = nextY / this.movingStepSize;
    const squaresXNumber = this.body.size.width / this.movingStepSize;
    const squaresYNumber = this.body.size.height / this.movingStepSize;

    const squares = [];

    for (let x = 0; x < squaresXNumber; x += 1) {
      let square;

      for (let y = 0; y < squaresYNumber; y += 1) {
        square = `${squareX + y},${squareY + x}`;

        squares.push(square);
      }
    }

    return squares;
  }

  // Validating that the next destination is free
  checkIsSpaceFree(nextX, nextY) {
    this.isSpaceFree = true;

    if (!this.isPlayerControlled) {
      const isCollideWithHero = isRectanglesCollide(
        {
          position: { x: this.position.x, y: this.position.y },
          width: this.body.size.width,
          height: this.body.size.height,
        },
        {
          position: { x: this.heroPosition.x, y: this.heroPosition.y },
          width: this.body.size.width,
          height: this.body.size.height,
        },
      );

      this.isSpaceFree = !isCollideWithHero;

      if (isCollideWithHero) {
        events.emit('CHARACTER_ACTIVE', this.message);

        return;
      }
    }

    const coordinatesList = this.normalizeCoordinates(nextX, nextY);

    for (const coordinate of coordinatesList) {
      if (gameMap.has(coordinate)) {
        this.isSpaceFree = false;
        break;
      }
    }

    return this.isSpaceFree;
  }

  move(moveAction = '') {
    for (
      let stepsCounter = 0;
      stepsCounter < this.movementStepsNumber;
      stepsCounter += 1
    ) {
      let nextX = this.destinationPosition.x;
      let nextY = this.destinationPosition.y;

      switch (moveAction) {
        case WALK_DOWN:
          nextY += this.movingStepSize;
          break;

        case WALK_UP:
          nextY -= this.movingStepSize;
          break;

        case WALK_LEFT:
          nextX -= this.movingStepSize;
          break;

        case WALK_RIGHT:
          nextX += this.movingStepSize;
          break;

        default:
          break;
      }

      const isSpaceFree = this.checkIsSpaceFree(nextX, nextY);

      if (isSpaceFree) {
        this.isCollide = false;
        this.destinationPosition.x = nextX;
        this.destinationPosition.y = nextY;
      } else {
        this.isCollide = true;
      }
    }
  }

  checkWayForwardIsPaved() {
    const distance = paveWayForward(
      this,
      this.destinationPosition,
      this.movementStepsNumber,
    );

    return distance <= 1;
  }

  updateMove(delta, root) {
    const { input } = root;
    const isWayForwardPaved = this.checkWayForwardIsPaved();
    let action = '';

    if (this.isAutoActionPlay) {
      action = this.generateAction(delta);
    } else if (this.isPlayerControlled) {
      action = input.action;
    }

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
