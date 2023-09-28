class Sprite {
  constructor({ image, imageWidth, imageHeight, canvas, position }) {
    this.image = image;
    this.width = image ? imageWidth || this.image.width : 0;
    this.height = image ? imageHeight || this.image.height : 0;
    this.canvas = canvas || null;
    this.gameWidth = canvas ? canvas.width : 0;
    this.gameHeight = canvas ? canvas.height : 0;
    this.context = canvas ? this.canvas.getContext('2d') : null;
    this.position = position || { x: 0, y: 0 };
  }

  draw() {
    if (this.image) {
      this.context.drawImage(this.image, this.position.x, this.position.y);
    }
  }
}
