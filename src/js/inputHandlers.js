import { state } from './state/state.js';
import { HERO_ACTIONS } from './data/constants.js';

function onKeyDown(e) {
  const key = e.code;

  for (let i = 0; i < HERO_ACTIONS.length; i += 1) {
    const action = HERO_ACTIONS[i];
    if (action.keys?.includes(key)) {
      state.hero[action.name] = true;
      // state.hero.currentAction = action.name;
      state.hero.prevAction = action.name;

      return;
    }
  }
}

function onKeyUp(e) {
  const key = e.code;

  for (let i = 0; i < HERO_ACTIONS.length; i += 1) {
    const action = HERO_ACTIONS[i];

    if (action.keys?.includes(key)) {
      state.hero[action.name] = false;
      return;
    }
  }
}

export { onKeyDown, onKeyUp };
