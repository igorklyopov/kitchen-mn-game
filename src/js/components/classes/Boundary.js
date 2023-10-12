class Boundary {
  constructor({ position = { x: 0, y: 0 }, width = 0, height = 0 }) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.isActive = false;
  }

  setIsActive(value) {
    this.isActive = value;
  }

  getIsActive() {
    return this.isActive;
  }

  draw(context) {
    context.fillStyle = 'rgba(244,8,222,0.5)';
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

export { Boundary };
