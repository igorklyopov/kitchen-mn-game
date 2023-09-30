import { Sprite } from './sprite.js';

class GameMap extends Sprite {
  constructor({
    image,
    frameX,
    frameY,
    frameWidth,
    frameHeight,
    canvas,
    position,
    fps,
  }) {
    super({
      image,
      frameX,
      frameY,
      frameWidth,
      frameHeight,
      canvas,
      position,
      fps,
    });
  }

  makeAction(action) {
    switch (action) {
      case 'move_top':
        this.position.y += 1;
        break;

      case 'move_bottom':
        this.position.y -= 1;
        break;

      case 'move_left':
        this.position.x += 1;
        break;

      case 'move_right':
        this.position.x -= 1;
        break;

      default:
        break;
    }
  }
}

export { GameMap };
