import { Sprite } from './Sprite.js';
import { heroAssetData } from '../../data/heroAssetData.js';

const {
  move_top,
  move_bottom,
  move_right,
  move_left,
  stand_top,
  stand_bottom,
  stand_right,
  stand_left,
} = heroAssetData.actions;

class Hero extends Sprite {
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

  makeAction(action, deltaTime) {
    switch (action) {
      case 'move_top':
        this.animateAction({
          frameY: move_top.frameY,
          maxFrame: move_top.maxFrame,
          deltaTime,
        });
        break;

      case 'move_bottom':
        this.animateAction({
          frameY: move_bottom.frameY,
          maxFrame: move_bottom.maxFrame,
          deltaTime,
        });
        break;

      case 'move_left':
        this.animateAction({
          frameY: move_left.frameY,
          maxFrame: move_left.maxFrame,
          deltaTime,
        });
        break;

      case 'move_right':
        this.animateAction({
          frameY: move_right.frameY,
          maxFrame: move_right.maxFrame,
          deltaTime,
        });
        break;

      case 'stand_top':
        this.frameX = stand_top.frameX;
        this.frameY = stand_top.frameY;
        break;

      case 'stand_bottom':
        this.frameX = stand_bottom.frameX;
        this.frameY = stand_bottom.frameY;
        break;

      case 'stand_left':
        this.frameX = stand_left.frameX;
        this.frameY = stand_left.frameY;
        break;

      case 'stand_right':
        this.frameX = stand_right.frameX;
        this.frameY = stand_right.frameY;
        break;

      default:
        break;
    }
  }
}

export { Hero };
