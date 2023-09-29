import { Sprite } from './sprite.js';
import { HERO_ACTIONS } from '../constants.js';

class Hero extends Sprite {
  constructor({ image, imageWidth, imageHeight, canvas, position }) {
    super({ image, imageWidth, imageHeight, canvas, position });
  }

  makeAction(action) {
    switch (action) {
      case 'move_top':
        // console.log(action);
        break;

      case 'move_bottom':
        // console.log(action);
        break;

      case 'move_left':
        // console.log(action);
        break;

      case 'move_right':
        // console.log(action);
        break;

      case 'move_right':
        // console.log(action);
        break;

      case 'stand_top':
        // console.log(action);
        break;

      case 'stand_bottom':
        // console.log(action);
        break;

      case 'stand_left':
        // console.log(action);
        break;

      case 'stand_right':
        // console.log(action);
        break;

      default:
        break;
    }
  }
}

export { Hero };
