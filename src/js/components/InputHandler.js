class InputHandler {
  constructor() {
    this.directionsNames = {};
    this.keyMap = {};
    this._direction = '';
    this._currentActions = [];

    this._init();
  }

  setKeyMap(keyMap = {}) {
    this.keyMap = keyMap;
  }

  setDirectionsNames(directionsNames = {}) {
    this.directionsNames = directionsNames;
  }

  _setDirection(direction = '') {
    if (
      direction !== '' &&
      this._direction !== direction &&
      this._direction === ''
    )
      this._direction = direction;
  }

  getDirection() {
    return this._direction;
  }

  _removeDirection(direction = '') {
    if (this._direction === direction) {
      this._direction = '';
    }
  }

  _setAction(action = '') {
    if (action === '') return;

    if (!this._currentActions.includes(action)) {
      // Add this action to the list if it's new
      this._currentActions.push(action);
    }
  }

  getActions() {
    return this._currentActions;
  }

  _removeAction(action = '') {
    const index = this._currentActions.indexOf(action);

    if (index === -1) {
      return;
    }
    // Remove this action from the list
    this._currentActions.splice(index, 1);
  }

  _init() {
    document.addEventListener('keydown', (e) => {
      for (const actionName in this.keyMap) {
        if (this.keyMap[actionName].includes(e.code)) {
          const isDirection = this.directionsNames[actionName];

          if (isDirection) {
            this._setDirection(actionName);
          } else {
            this._setAction(actionName);
          }
        }
      }
    });

    document.addEventListener('keyup', (e) => {
      for (const actionName in this.keyMap) {
        if (this.keyMap[actionName].includes(e.code)) {
          const isDirection = this.directionsNames[actionName];

          if (isDirection) {
            this._removeDirection(actionName);
          } else {
            this._removeAction(actionName);
          }
        }
      }
    });
  }
}

export { InputHandler };
