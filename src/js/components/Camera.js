import { GameObject } from './GameObject.js';
// import { events } from './Events.js';
import { Vector2 } from './Vector2.js';
import { GAME_CANVAS_WIDTH, GAME_CANVAS_HEIGHT } from '../data/constants.js';
import { assetsData } from '../data/assetsData.js';
import { findAssetByName } from '../utils/findAssetByName.js';

const heroSpriteData = findAssetByName(assetsData, 'hero');

export class Camera extends GameObject {
  constructor(heroPosition = new Vector2({ x: 0, y: 0 })) {
    super({ name: 'camera' });

    this.position = new Vector2({ x: 0, y: 0 });
    this.heroHalf = heroSpriteData.frameSize.width / 2;
    this.canvasWidth = GAME_CANVAS_WIDTH;
    this.canvasHeight = GAME_CANVAS_HEIGHT;
    this.halfWidth = -this.heroHalf + this.canvasWidth / 2;
    this.halfHeight = -this.heroHalf + this.canvasHeight / 2;
    this.heroPosition = heroPosition;
    this.track();
  }

  track() {
    this.position = new Vector2({
      x: -this.heroPosition.x + this.halfWidth,
      y: -this.heroPosition.y + this.halfHeight,
    });
  }
}
