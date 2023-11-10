// A 2-element structure that can be used to represent 2D coordinates or any other pair of numeric values

class Vector2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  duplicate() {
    return new Vector2(this.x, this.y);
  }
}

export { Vector2 };
