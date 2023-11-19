import { GameObject } from './GameObject.js';
import { Vector2 } from './Vector2.js';
import { Sprite } from './Sprite.js';
import { events } from './Events.js';
import { ACTIONS_NAMES, MOVING_STEP, GRID_SIZE } from '../data/constants.js';
import { assetsData } from '../data/assetsData.js';
import { moveTowards } from '../helpers/moveTowards.js';
import { collisionBoundaries } from '../helpers/collisionBoundaries.js';
import { findAssetByName } from '../utils/findAssetByName.js';
import { isRectanglesCollide } from '../utils/isRectanglesCollide.js';

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

export class Hero extends GameObject {
  constructor({ name = 'hero', x = 0, y = 0 }) {
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
    });
    this.addChild(this.body);

    this.action = STAND_UP;
    this.destinationPosition = this.position.duplicate();
    this.speed = MOVING_STEP; // the number of squares the hero moves at one time
    this.itemPickupTime = 0;
    this.itemPickupShell = null;
  }

  step(delta, root) {
    const distance = moveTowards(this, this.destinationPosition, this.speed);
    const hasArrived = distance <= 1;

    if (hasArrived) this.tryMove(root, delta);
    this.tryEmitPosition();
  }

  tryEmitPosition() {
    if (this.lastX === this.position.x && this.lastY === this.position.y) {
      return;
    }
    this.lastX = this.position.x;
    this.lastY = this.position.y;
    events.emit('HERO_POSITION', this.position);
  }

  tryMove(root, delta) {
    const { input } = root;

    let nextX = this.destinationPosition.x;
    let nextY = this.destinationPosition.y;
    let isSpaceFree = true;

    switch (input.action) {
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
        nextY += GRID_SIZE;
        this.body.playAnimation({
          animationName: 'walkDown',
          deltaTime: delta,
        });
        break;

      case WALK_UP:
        nextY -= GRID_SIZE;
        this.body.playAnimation({ animationName: 'walkUp', deltaTime: delta });
        break;

      case WALK_LEFT:
        nextX -= GRID_SIZE;
        this.body.playAnimation({
          animationName: 'walkLeft',
          deltaTime: delta,
        });
        break;

      case WALK_RIGHT:
        nextX += GRID_SIZE;
        this.body.playAnimation({
          animationName: 'walkRight',
          deltaTime: delta,
        });
        break;

      default:
        return;
    }

    this.action = input.action ?? this.action;

    // Validating that the next destination is free
    const rectA = {
      position: { x: nextX, y: nextY },
      width: this.body.frameSize.width / 2,
      height: this.body.frameSize.height / 2,
    };

    for (let i = 0; i < collisionBoundaries.length; i++) {
      const boundary = collisionBoundaries[i];
      const rectB = {
        position: boundary.position,
        width: boundary.width / 2,
        height: boundary.height / 2,
      };

      if (isRectanglesCollide(rectA, rectB)) {
        isSpaceFree = false;
        break;
      }
    }

    if (isSpaceFree) {
      this.destinationPosition.x = nextX;
      this.destinationPosition.y = nextY;
    }
  }
}
