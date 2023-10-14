import { ACTIONS_NAMES } from '../data/constants.js';

const state = {
  background: { moving: true },
  hero: {
    prevAction: '',
    currentAction: '',
    [ACTIONS_NAMES.move_top]: false,
    [ACTIONS_NAMES.move_bottom]: false,
    [ACTIONS_NAMES.move_left]: false,
    [ACTIONS_NAMES.move_right]: false,
  },
};

export { state };
