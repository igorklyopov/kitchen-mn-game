import { Sprite } from './Sprite.js';
import { heroAssetData } from '../../data/heroAssetData.js';
import { ACTIONS_NAMES } from '../../data/constants.js';

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
  }

  makeAction(action = '', deltaTime = this.fps) {
    switch (action) {
      case ACTIONS_NAMES.move_top:
        this.animateAction({
          frameY: move_top.frameY,
          deltaTime,
        });
        break;

      case ACTIONS_NAMES.move_bottom:
        this.animateAction({
          frameY: move_bottom.frameY,
          deltaTime,
        });
        break;

      case ACTIONS_NAMES.move_left:
        this.animateAction({
          frameY: move_left.frameY,
          deltaTime,
        });
        break;

      case ACTIONS_NAMES.move_right:
        this.animateAction({
          frameY: move_right.frameY,
          deltaTime,
        });
        break;

      case ACTIONS_NAMES.stand_top:
        this.frameX = stand_top.frameX;
        this.frameY = stand_top.frameY;
        break;

      case ACTIONS_NAMES.stand_bottom:
        this.frameX = stand_bottom.frameX;
        this.frameY = stand_bottom.frameY;
        break;

      case ACTIONS_NAMES.stand_left:
        this.frameX = stand_left.frameX;
        this.frameY = stand_left.frameY;
        break;

      case ACTIONS_NAMES.stand_right:
        this.frameX = stand_right.frameX;
        this.frameY = stand_right.frameY;
        break;

      default:
        break;
    }
  }
}

export { Hero };
