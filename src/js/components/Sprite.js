import { DEV_MODE } from '../data/constants.js';
import { FrameTimer } from './FrameTimer.js';
import { GameObject } from './GameObject.js';

class Sprite extends GameObject {
  constructor({
    name = 'sprite',
    imageSrc = '',
    position = { x: 0, y: 0 },
    frameX = 0,
    frameY = 0,
    frameSize = { width: 16, height: 16 },
    frameXMaxNumber = 1,
    frameYNumber = 1,
    animations = {},
    scale = 1,
  }) {
    super({ name });

    this.image = new Image();
    this.image.onload = () => {
      this.imgLoaded = true;

      this.frameWidth = this.image.width / frameXMaxNumber || frameSize.width;
      this.frameHeight = this.image.height / frameYNumber || frameSize.height;
    };
    this.image.onerror = () => {
      console.error(`image with src ${imageSrc} is not loaded`);
    };
    this.image.src = imageSrc;
    this.imgLoaded = false;
    this.position = position;

    this.frameSize = frameSize;
    this.frameX = frameX;
    this.frameY = frameY;
    this.frameXMaxNumber = frameXMaxNumber;
    this.frameYNumber = frameYNumber;
    this.scale = scale;

    this.animations = animations;
    this.currentAnimationFrameIndex = 0;
    this.frameInterval = 0;
    this.frameTimer = new FrameTimer();
    this.animationName = '';
  }

  step(delta) {
    if (Object.keys(this.animations).length < 1 || this.animationName === '') {
      return;
    }

    this.playAnimation({ animationName: this.animationName, deltaTime: delta });
  }

  playAnimation({ animationName = '', deltaTime }) {
    const makeFramesIndexesList = () => {
      if (!this.animations[this.animationName]) {
        console.error('animation with this name not found');
        return;
      }

      const frames = [];
      const currentFrameXNumber =
        this.animations[this.animationName].frameXNumber;
      const currentFrameStartIndex =
        this.animations[this.animationName].startFrameIndex;

      for (let frame = 0; frame < currentFrameXNumber; frame += 1) {
        frames.push(frame);
      }

      if (frames[frames.length - 1] !== currentFrameStartIndex)
        frames.push(currentFrameStartIndex);

      return frames;
    };
    const changeFrame = () => {
      if (!framesIndexesList[this.currentAnimationFrameIndex])
        this.currentAnimationFrameIndex = 0;

      this.frameX = framesIndexesList[this.currentAnimationFrameIndex];
      this.currentAnimationFrameIndex += 1;
    };
    this.animationName = animationName;

    const framesIndexesList = makeFramesIndexesList();
    if (!framesIndexesList) return;

    this.frameY = this.animations[this.animationName].frameY;

    if (framesIndexesList.length === 1) {
      this.frameX = framesIndexesList[0];
      return;
    }

    this.frameInterval = 1000 / this.animations[this.animationName].fps; // 1000 - it is 1000 ms
    this.frameTimer.setTime(this.frameInterval);
    this.frameTimer.setCallback(changeFrame);
    this.frameTimer.start(deltaTime);
  }

  draw(context) {
    if (this.imgLoaded) {
      context.drawImage(
        this.image,
        this.frameX * this.frameSize.width, // Top X corner of frame
        this.frameY * this.frameSize.height, // Top Y corner of frame
        this.frameSize.width, // How much to crop from the sprite sheet (X)
        this.frameSize.height, // How much to crop from the sprite sheet (Y)
        this.position.x, // Where to place this on canvas tag X (0)
        this.position.y, // Where to place this on canvas tag Y (0)
        this.frameSize.width * this.scale, // How large to scale it (X)
        this.frameSize.height * this.scale, // How large to scale it (Y)
      );
    }

    if (DEV_MODE) this.drawRectBorder(context); // for test
  }

  // for test
  drawRectBorder(ctx) {
    ctx.strokeStyle = 'rgba(16,193,16,1)';
    ctx.strokeRect(
      this.position.x,
      this.position.y,
      this.frameSize.width,
      this.frameSize.height,
    );

    // origin
    ctx.strokeStyle = 'red';
    ctx.strokeRect(this.position.x, this.position.y, 2, 2);
  }
}

export { Sprite };
