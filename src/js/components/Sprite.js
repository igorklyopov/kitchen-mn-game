class Sprite {
  constructor({
    imageSrc = '',
    position = { x: 0, y: 0 },
    frameX = 0,
    frameY = 0,
    frameSize = { width: 16, height: 16 },
    frameXMaxNumber = 1,
    frameYNumber = 1,
    animations = {},
  }) {
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
  }

  draw(context) {
    if (this.imgLoaded) {
      context.drawImage(
        this.image,
        this.frameX * this.frameSize.width,
        this.frameY * this.frameSize.height,
        this.frameSize.width,
        this.frameSize.height,
        this.position.x,
        this.position.y,
        this.frameSize.width,
        this.frameSize.height,
      );
    }
  }

  playAnimation({ animationName = '', deltaTime }) {
    const makeFramesIndexesList = () => {
      const currentFrameXNumber = this.animations[animationName].frameXNumber;
      const currentFrameStartIndex =
        this.animations[animationName].startFrameIndex;
      const frames = [];

      for (let i = 0; i < currentFrameXNumber; i += 1) {
        frames.push(i);
      }

      if (frames[frames.length - 1] !== currentFrameStartIndex)
        frames.push(currentFrameStartIndex);

      return frames;
    };

    const framesIndexesList = makeFramesIndexesList();

    this.frameY = this.animations[animationName].frameY;

    if (framesIndexesList.length === 1) {
      this.frameX = framesIndexesList[0];
      return;
    }

    this.frameInterval = 1000 / this.animations[animationName].fps;

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
}

export { Sprite };
