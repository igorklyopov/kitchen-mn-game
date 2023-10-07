class Sprite {
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
    this.image = image;
    this.frameX = frameX || 0;
    this.frameY = frameY || 0;
    this.frameWidth = image ? frameWidth || this.image.width : 0;
    this.frameHeight = image ? frameHeight || this.image.height : 0;
    this.canvas = canvas || null;
    this.gameWidth = canvas ? canvas.width : 0;
    this.gameHeight = canvas ? canvas.height : 0;
    this.context = canvas ? this.canvas.getContext('2d') : null;
    this.position = position || { x: 0, y: 0 };
    this.fps = fps || 10;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
  }

  animateAction({ frameY, maxFrame, deltaTime }) {
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;

      this.frameY = frameY;
      this.frameX < maxFrame ? (this.frameX += 1) : (this.frameX = 0);
    } else {
      this.frameTimer += deltaTime;
    }
  }

  draw() {
    if (this.image) {
      this.context.drawImage(
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
