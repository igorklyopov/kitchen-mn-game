class Boundary {
  constructor({
    position = { x: 0, y: 0 },
    width = 0,
    height = 0,
    color = 'red',
  }) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

export { Boundary };
