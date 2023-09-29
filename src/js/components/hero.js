import { Sprite } from './sprite.js';
import { HERO_ACTIONS } from '../constants.js';

class Hero extends Sprite {
  constructor({ image, imageWidth, imageHeight, canvas, position }) {
    super({ image, imageWidth, imageHeight, canvas, position });
  }

  makeAction(action) {
    switch (action) {
      case HERO_ACTIONS.move_top:
        console.log(action);
        break;

      case HERO_ACTIONS.move_bottom:
        console.log(action);
        break;

      case HERO_ACTIONS.move_left:
        console.log(action);
        break;

      case 'move_right':
        console.log(action);
        break;

      case HERO_ACTIONS.move_right:
        console.log(action);
        break;

      case HERO_ACTIONS.stand_top:
        console.log(action);
        break;

      case HERO_ACTIONS.stand_bottom:
        console.log(action);
        break;

      case HERO_ACTIONS.stand_left:
        console.log(action);
        break;

      case HERO_ACTIONS.stand_right:
        console.log(action);
        break;

      default:
        break;
    }
  }
}

export { Hero };
