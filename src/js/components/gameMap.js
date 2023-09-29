import { Sprite } from './sprite.js';

class GameMap extends Sprite {
  constructor({ image, imageWidth, imageHeight, canvas, position }) {
    super({ image, imageWidth, imageHeight, canvas, position });
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
