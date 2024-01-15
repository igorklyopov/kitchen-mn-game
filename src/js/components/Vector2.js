// A 2-element structure that can be used to represent 2D coordinates or any other pair of numeric values

class Vector2 {
  constructor(config = { a: 0, b: 0 }) {
    this._initialProps = { ...config };
    this._keyA = Object.keys(this._initialProps)[0];
    this._keyB = Object.keys(this._initialProps)[1];
    this[this._keyA] = Object.values(this._initialProps)[0];
    this[this._keyB] = Object.values(this._initialProps)[1];

    // Запрещает добавлять/удалять свойства. Устанавливает configurable: false для всех существующих свойств
    Object.seal(this);
  }

  duplicate() {
    const config = {
      [this._keyA]: this[this._keyA],
      [this._keyB]: this[this._keyB],
    };
    return new Vector2(config);
  }
}

export { Vector2 };
