class Sprite {
  constructor({
    imageSrc = '',
    frameX = 0,
    frameY = 0,
    frameWidth = 0,
    frameHeight = 0,
    frameXCount = 1,
    frameYCount = 1,
    position = { x: 0, y: 0 },
    fps = 10,
  }) {
    this.image = new Image();
    this.image.onload = () => {
      this.imgLoaded = true;

      this.frameWidth = this.image.width / frameXCount || frameWidth;
      this.frameHeight = this.image.height / frameYCount || frameHeight;
    };
    this.image.onerror = () => {
      console.error(`image with src ${imageSrc} is not loaded`);
    };
    this.image.src = imageSrc;
    this.imgLoaded = false;
    this.frameX = frameX;
    this.frameY = frameY;
    this.frameXCount = frameXCount;
    this.frameYCount = frameYCount;
    this.maxFrame = frameXCount - 1;
    this.position = position;
    this.fps = fps;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
  }

  animateAction({ frameY, maxFrame, deltaTime }) {
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;

      this.frameY = frameY;
      this.frameX < maxFrame /*this.maxFrame*/
        ? (this.frameX += 1)
        : (this.frameX = 0);
    } else {
      this.frameTimer += deltaTime;
    }
  }

  draw(context) {
    if (this.imgLoaded) {
      context.drawImage(
        this.image,
        this.frameX * this.frameWidth,
        this.frameY * this.frameHeight,
        this.frameWidth,
        this.frameHeight,
        this.position.x,
        this.position.y,
        this.frameWidth,
        this.frameHeight
      );
    }
  }
}

export { Sprite };
