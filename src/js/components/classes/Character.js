import { Sprite } from './Sprite.js';

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

    this.waypointIndex = 0;
  }

  update(path = []) {
    const waypoint = path[this.waypointIndex].position;
    const yDistance = waypoint.y - this.position.y;
    const xDistance = waypoint.x - this.position.x;
    const angle = Math.atan2(yDistance, xDistance);

    this.position.x += Math.cos(angle);
    this.position.y += Math.sin(angle);

    if (
      Math.round(this.position.x) === Math.round(waypoint.x) &&
      Math.round(this.position.y) === Math.round(waypoint.y) &&
      this.waypointIndex < path.length - 1
    ) {
      this.waypointIndex += 1;
    }

    if (this.waypointIndex === path.length - 1) this.waypointIndex = 0;
  }
}

export { Character };
