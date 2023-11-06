import { Hero } from './Hero';
import { checkRectangleCollision } from '../../utils/checkRectangleCollision';
import { hero } from '../hero';
import { ACTIONS_NAMES } from '../../data/constants';

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
    name,
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

    this.name = name;
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

  get id() {
    return this.name;
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
        state.characters.curActiveId = this.id; // for dialog
      } else {
        state.background.moving = true;
        state.characters.curActiveId = ''; // for dialog
        state.characters.prevActiveId = '';
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

      if (deltaX < 0) return (direction = ACTIONS_NAMES.moveRight);

      if (deltaX > 0) return (direction = ACTIONS_NAMES.moveLeft);

      if (deltaY > 0) direction = ACTIONS_NAMES.moveTop;

      if (deltaY < 0) direction = ACTIONS_NAMES.moveBottom;

      return direction;
    };

    const action = getMoveDirection();
    this.makeAction(action, deltaTime);
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
