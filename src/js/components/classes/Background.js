import { Sprite } from './Sprite.js';

class Background extends Sprite {
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
}

export { Background };
