// A 2-element structure that can be used to represent 2D coordinates or any other pair of numeric values

class Vector2 {
  constructor(config = { a: 0, b: 0 }) {
    this._initialProps = { ...config };
    this[`${Object.keys(this._initialProps)[0]}`] = Object.values(
      this._initialProps,
    )[0];
    this[`${Object.keys(this._initialProps)[1]}`] = Object.values(
      this._initialProps,
    )[1];

    // Prohibits adding/removing properties. Sets configurable: false for all existing properties
    Object.seal(this);
  }

  duplicate() {
    const config = {
      [`${Object.keys(this._initialProps)[0]}`]:
        this[`${Object.keys(this._initialProps)[0]}`],
      [`${Object.keys(this._initialProps)[1]}`]:
        this[`${Object.keys(this._initialProps)[1]}`],
    };
    return new Vector2(config);
  }
}

export { Vector2 };
