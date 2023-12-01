import { GameObject } from './GameObject.js';
import { events } from './Events.js';
import { Vector2 } from './Vector2.js';
import { GAME_CANVAS_WIDTH, GAME_CANVAS_HEIGHT } from '../data/constants.js';
import { assetsData } from '../data/assetsData.js';
import { findAssetByName } from '../utils/findAssetByName.js';

const heroSpriteData = findAssetByName(assetsData, 'hero');

export class Camera extends GameObject {
  constructor() {
    super({ name: 'camera' });

    events.on('HERO_POSITION', this, (heroPosition) => {
      // Create a new position based on the hero's position
      const heroHalf = heroSpriteData.frameSize.width / 2;
      const canvasWidth = GAME_CANVAS_WIDTH;
      const canvasHeight = GAME_CANVAS_HEIGHT;
      const halfWidth = -heroHalf + canvasWidth / 2;
      const halfHeight = -heroHalf + canvasHeight / 2;
      this.position = new Vector2(
        -heroPosition.x + halfWidth,
        -heroPosition.y + halfHeight,
      );
    });
  }
}
