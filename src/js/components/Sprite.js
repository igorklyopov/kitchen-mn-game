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

    this.animations = animations;
    this.currentAnimationFrameIndex = 0;
    this.frameInterval = 0;
    this.frameTimer = 0;
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
      const currentFrameXNumber =
        this.animations[this.animationName].frameXNumber;
      const currentFrameStartIndex =
        this.animations[this.animationName].startFrameIndex;
      const frames = [];

      for (let i = 0; i < currentFrameXNumber; i += 1) {
        frames.push(i);
      }

      if (frames[frames.length - 1] !== currentFrameStartIndex)
        frames.push(currentFrameStartIndex);

      return frames;
    };
    this.animationName = animationName;

    const framesIndexesList = makeFramesIndexesList();

    this.frameY = this.animations[this.animationName].frameY;

    if (framesIndexesList.length === 1) {
      this.frameX = framesIndexesList[0];
      return;
    }

    this.frameInterval = 1000 / this.animations[this.animationName].fps;

    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;

      if (!framesIndexesList[this.currentAnimationFrameIndex])
        this.currentAnimationFrameIndex = 0;

      this.frameX = framesIndexesList[this.currentAnimationFrameIndex];

      this.currentAnimationFrameIndex += 1;
    } else {
      this.frameTimer += deltaTime;
    }
  }

  draw(context) {
    this.drawRect(context); // for test

    if (this.imgLoaded) {
      context.drawImage(
        this.image,
        this.frameX * this.frameSize.width, // Top X corner of frame
        this.frameY * this.frameSize.height, // Top Y corner of frame
        this.frameSize.width, // How much to crop from the sprite sheet (X)
        this.frameSize.height, // How much to crop from the sprite sheet (Y)
        this.position.x, // Where to place this on canvas tag X (0)
        this.position.y, // Where to place this on canvas tag Y (0)
        this.frameSize.width, // How large to scale it (X)
        this.frameSize.height, // How large to scale it (Y)
      );
    }
  }

  // for test
  drawRect(ctx) {
    ctx.strokeStyle = 'rgba(16,193,16,1)';
    ctx.strokeRect(
      this.position.x,
      this.position.y,
      this.frameSize.width,
      this.frameSize.height,
    );
  }
}

export { Sprite };
