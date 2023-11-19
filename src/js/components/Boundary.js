import { GameObject } from './GameObject';

class Boundary extends GameObject {
  constructor({
    name = 'boundary',
    position = { x: 0, y: 0 },
    width = 0,
    height = 0,
    color = 'red',
  }) {
    super({ name });

    this.name = name;
    this.position = position;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw(context, x = 0, y = 0) {
    context.fillStyle = this.color;
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

export { Boundary };
