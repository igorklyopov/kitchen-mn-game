import { isRectanglesCollide } from '../utils/isRectanglesCollide';

class Cell {
  constructor({
    position = { x: 0, y: 0 },
    size = { width: 0, height: 0 },
    color = '#000000',
    text = '',
  }) {
    this.position = position;
    this.size = size;
    this.color = color;
    this.text = text;
    this.isActive = false;
  }

  set active(value) {
    this.isActive = value;
  }

  get active() {
    return this.isActive;
  }

  draw(ctx) {
    ctx.strokeStyle = this.color;
    ctx.strokeRect(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height,
    );

    ctx.fillStyle = this.color;
    ctx.font = '8px Roboto';
    ctx.fillText(this.text, this.position.x + 1, this.position.y + 11);
  }
}

class GridHelper {
  constructor({
    size = { width: 0, height: 0 },
    cellSize = { width: 0, height: 0 },
    color,
    canvas,
  }) {
    this.size = size;
    this.cellSize = cellSize;
    this.color = color;
    this.canvas = canvas;

    this.cells = [];
    this.mouse = {
      position: { x: 0, y: 0 },
      width: 0.1,
      height: 0.1,
    };
    this.ctx = canvas.getContext('2d');
    this.canvasPosition = canvas.getBoundingClientRect();

    this.create();
  }

  create() {
    // let cellNumber = 1;
    for (let y = 0; y < this.size.height; y += this.cellSize.height) {
      for (let x = 0; x < this.size.width; x += this.cellSize.width) {
        const cell = new Cell({
          position: { x, y },
          size: {
            width: this.cellSize.width,
            height: this.cellSize.height,
          },
          color: this.color,
          // text: `${x / 16},${y / 16}`,
          // text: `${x / 16}`,
          text: `${y / 16}`,
          // text: cellNumber,
        });

        this.cells.push(cell);

        // if (x < this.size.width - this.cellSize.width) cellNumber += 1;
      }
      // if (y < this.size.height - this.cellSize.height) cellNumber += 1;
    }

    this.canvas.addEventListener('mousedown', (e) => {
      this.mouse.position.x = e.x - this.canvasPosition.left;
      this.mouse.position.y = e.y - this.canvasPosition.top;

      for (let i = 0; i < this.cells.length; i++) {
        const item = this.cells[i];

        if (
          isRectanglesCollide(
            {
              position: item.position,
              width: item.size.width,
              height: item.size.height,
            },
            this.mouse,
          )
        ) {
          item.active = !item.active;
          // console.log(this.mouse.position, item.position, item.text);

          break;
        }
      }
    });
  }

  draw() {
    this.cells.forEach((cell) => cell.draw(this.ctx));
  }
}

export { GridHelper, Cell };
