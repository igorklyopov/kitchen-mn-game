import { ACTIONS_NAMES, HERO_ACTIONS_KEYS } from '../data/constants';

const {
  WALK_UP,
  WALK_DOWN,
  WALK_LEFT,
  WALK_RIGHT,
  STAND_UP,
  STAND_DOWN,
  STAND_LEFT,
  STAND_RIGHT,
} = ACTIONS_NAMES;

class InputHandler {
  constructor() {
    this.heldActions = [];

    document.addEventListener('keydown', (e) => {
      // Also check for dedicated direction list
      switch (e.code) {
        case HERO_ACTIONS_KEYS.WALK_UP.find((key) => key === e.code):
          this.setAction(WALK_UP);
          break;

        case HERO_ACTIONS_KEYS.WALK_DOWN.find((key) => key === e.code):
          this.setAction(WALK_DOWN);
          break;

        case HERO_ACTIONS_KEYS.WALK_LEFT.find((key) => key === e.code):
          this.setAction(WALK_LEFT);
          break;

        case HERO_ACTIONS_KEYS.WALK_RIGHT.find((key) => key === e.code):
          this.setAction(WALK_RIGHT);
          break;

        default:
          // eslint-disable-next-line no-useless-return
          return;
      }
    });

    document.addEventListener('keyup', (e) => {
      // Also check for dedicated direction list
      switch (e.code) {
        case HERO_ACTIONS_KEYS.WALK_UP.find((key) => key === e.code):
          this.removeAction(WALK_UP);
          this.setAction(STAND_UP);
          break;

        case HERO_ACTIONS_KEYS.WALK_DOWN.find((key) => key === e.code):
          this.removeAction(WALK_DOWN);
          this.setAction(STAND_DOWN);
          break;

        case HERO_ACTIONS_KEYS.WALK_LEFT.find((key) => key === e.code):
          this.removeAction(WALK_LEFT);
          this.setAction(STAND_LEFT);
          break;

        case HERO_ACTIONS_KEYS.WALK_RIGHT.find((key) => key === e.code):
          this.removeAction(WALK_RIGHT);
          this.setAction(STAND_RIGHT);
          break;

        default:
          // eslint-disable-next-line no-useless-return
          return;
      }
    });
  }

  get action() {
    return this.heldActions[0];
  }

  setAction(action) {
    this.heldActions.shift();

    // Add this arrow to the queue if it's new
    if (!this.heldActions.includes(action)) {
      this.heldActions.unshift(action);
    }
  }

  removeAction(action) {
    const index = this.heldActions.indexOf(action);
    if (index === -1) {
      return;
    }
    // Remove this key from the list
    this.heldActions.splice(index, 1);
  }
}

export { InputHandler };
