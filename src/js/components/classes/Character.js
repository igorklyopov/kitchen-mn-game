import { Sprite } from './Sprite.js';
import { checkRectangleCollision } from '../../utils/checkRectangleCollision.js';
import { hero } from '../hero.js';

class Character extends Sprite {
  constructor({
    imageSrc,
    frameX,
    frameY,
    frameWidth,
    frameHeight,
    frameXCount,
    frameYCount,
    position,
    fps,
    path,
  }) {
    super({
      imageSrc,
      frameX,
      frameY,
      frameWidth,
      frameHeight,
      frameXCount,
      frameYCount,
      position,
      fps,
    });

    this.path = path;
    this.waypointIndex = 0;
    this.isActive = false;
    this.timeToAction = 2000; // in ms
  }

  update(state = {}, deltaTime) {
    // ====== check hero collision ======>
    const rectA = {
      width: hero.frameWidth,
      height: hero.frameHeight,
      position: hero.position,
    };

    const isColliding = checkRectangleCollision({
      rectA,
      rectB: {
        width: this.frameWidth,
        height: this.frameHeight,
        position: {
          x: this.position.x,
          y: this.position.y,
        },
      },
    });

    if (isColliding) {
      if (state.hero.currentAction.includes('stand')) {
        this.isActive = true;
        state.background.moving = false;
      } else {
        state.background.moving = true;
      }
    } else {
      /**
       * make holdback before start moving
       */
      if (this.frameTimer > this.timeToAction) {
        this.frameTimer = 0;
        this.isActive = false;
      } else {
        this.frameTimer += deltaTime;
      }
    }

    if (this.isActive) return;
    // <====== END check hero collision ======

    /**
     * make movement
     */
    const waypoint = this.path[this.waypointIndex].position;
    const yDistance = waypoint.y - this.position.y;
    const xDistance = waypoint.x - this.position.x;
    const angle = Math.atan2(yDistance, xDistance);

    this.position.x += Math.cos(angle);
    this.position.y += Math.sin(angle);

    if (
      Math.round(this.position.x) === Math.round(waypoint.x) &&
      Math.round(this.position.y) === Math.round(waypoint.y) &&
      this.waypointIndex < this.path.length - 1
    ) {
      this.waypointIndex += 1;
    }

    /**
     * make moving loop
     */
    if (this.waypointIndex === this.path.length - 1) this.waypointIndex = 0;
  }
}

export { Character };
