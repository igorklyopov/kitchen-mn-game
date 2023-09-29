import { Sprite } from './sprite.js';
import { HERO_ACTIONS } from '../constants.js';

class GameMap extends Sprite {
  constructor({ image, imageWidth, imageHeight, canvas, position }) {
    super({ image, imageWidth, imageHeight, canvas, position });
  }

  makeAction(action) {
    switch (action) {
      case HERO_ACTIONS.move_top:
        this.position.y += 1;
        break;

      case HERO_ACTIONS.move_bottom:
        this.position.y -= 1;
        break;

      case HERO_ACTIONS.move_left:
        this.position.x += 1;
        break;

      case HERO_ACTIONS.move_right:
        this.position.x -= 1;
        break;

      default:
        break;
    }
  }
}

export { GameMap };
