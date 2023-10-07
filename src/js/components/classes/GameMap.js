import { Sprite } from './Sprite.js';

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
}

export { GameMap };
