class InputHandler {
  constructor() {
    this.directionsNames = {};
    this.keyMap = {};
    this._direction = '';
    this._actionsList = [];
    this._defaultAction = '';

    this._init();
  }

  setKeyMap(keyMap = {}) {
    this.keyMap = keyMap;
  }

  setDefaultAction(actionName = '') {
    this._defaultAction = actionName;
  }

  setDirectionsNames(directionsNames = {}) {
    this.directionsNames = directionsNames;
  }

  _setDirection(direction = '') {
    if (this._direction !== direction) this._direction = direction;
  }

  getDirection() {
    if (this._direction !== '') {
      return this._direction;
    } else {
      return null;
    }
  }

  _removeDirection() {
    this._direction = '';
  }

  _setAction(action = '') {
    if (action === '') return;

    if (!this._actionsList.includes(action)) {
      // Add this action to the queue if it's new
      this._actionsList.push(action);
    }
  }

  getAction() {
    if (this._actionsList.length > 0) {
      return this._actionsList;
    } else {
      return null;
    }
  }

  _removeAction(action = '') {
    const index = this._actionsList.indexOf(action);

    if (index === -1) {
      return;
    }
    // Remove this action from the list
    this._actionsList.splice(index, 1);
  }

  _init() {
    document.addEventListener('keydown', (e) => {
      for (const directionName in this.keyMap) {
        if (this.keyMap[directionName].includes(e.code)) {
          const isDirection = this.directionsNames[directionName];

          if (isDirection) {
            this._setDirection(directionName);
            this._setAction(this._defaultAction);
          } else {
            this._setAction(directionName);
          }
        }
      }
    });

    document.addEventListener('keyup', (e) => {
      for (const directionName in this.keyMap) {
        if (this.keyMap[directionName].includes(e.code)) {
          const isDirection = this.directionsNames[directionName];

          if (isDirection) {
            this._removeDirection();
            this._removeAction(this._defaultAction);
          } else {
            this._removeAction(directionName);
          }
        }
      }
    });
  }
}

export { InputHandler };
