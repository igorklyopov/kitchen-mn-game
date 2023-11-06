import { Sprite } from './Sprite';
import { heroAssetData } from '../../data/heroAssetData';
import { ACTIONS_NAMES } from '../../data/constants';

const {
  moveTop,
  moveBottom,
  moveRight,
  moveLeft,
  standTop,
  standBottom,
  standRight,
  standLeft,
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
      case ACTIONS_NAMES.moveTop:
        this.animateAction({
          frameY: moveTop.frameY,
          deltaTime,
        });
        break;

      case ACTIONS_NAMES.moveBottom:
        this.animateAction({
          frameY: moveBottom.frameY,
          deltaTime,
        });
        break;

      case ACTIONS_NAMES.moveLeft:
        this.animateAction({
          frameY: moveLeft.frameY,
          deltaTime,
        });
        break;

      case ACTIONS_NAMES.moveRight:
        this.animateAction({
          frameY: moveRight.frameY,
          deltaTime,
        });
        break;

      case ACTIONS_NAMES.standTop:
        this.frameX = standTop.frameX;
        this.frameY = standTop.frameY;
        break;

      case ACTIONS_NAMES.standBottom:
        this.frameX = standBottom.frameX;
        this.frameY = standBottom.frameY;
        break;

      case ACTIONS_NAMES.standLeft:
        this.frameX = standLeft.frameX;
        this.frameY = standLeft.frameY;
        break;

      case ACTIONS_NAMES.standRight:
        this.frameX = standRight.frameX;
        this.frameY = standRight.frameY;
        break;

      default:
        break;
    }
  }
}

export { Hero };
