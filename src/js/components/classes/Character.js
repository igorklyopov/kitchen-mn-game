import { Hero } from './Hero.js';
import { checkRectangleCollision } from '../../utils/checkRectangleCollision.js';
import { hero } from '../hero.js';
import { ACTIONS_NAMES } from '../../data/constants.js';

class Character extends Hero {
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
    this.active = false;
    this.timeToAction = 1000; // in ms
  }

  set isActive(value) {
    this.active = value;
  }

  get isActive() {
    return this.active;
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
       * make holdback before start moving (after hero collision)
       */
      if (this.frameTimer > this.timeToAction) {
        this.frameTimer = 0;
        this.active = false;
      } else {
        this.frameTimer += deltaTime;
      }
    }

    if (this.active) return;
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
    /**
     * movement animation
     */
    const getMoveDirection = () => {
      const deltaX = Math.round(this.position.x) - Math.round(waypoint.x);
      const deltaY = Math.round(this.position.y) - Math.round(waypoint.y);

      let direction = '';

      if (deltaX < 0) return (direction = ACTIONS_NAMES.move_right);

      if (deltaX > 0) return (direction = ACTIONS_NAMES.move_left);

      if (deltaY > 0) direction = ACTIONS_NAMES.move_top;

      if (deltaY < 0) direction = ACTIONS_NAMES.move_bottom;

      return direction;
    };

    const action = getMoveDirection();
    this.makeAction(action, deltaTime );
    /**
     * END movement animation
     */

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
