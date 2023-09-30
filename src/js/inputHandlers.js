import { HERO_ACTIONS } from './data/constants.js';
import { state } from './state/state.js';

function onKeyDown(e) {
  const key = e.code;

  for (const action of HERO_ACTIONS) {
    if (action.keys?.includes(key)) {
      state.hero.currentAction = action.name;
      return;
    }
  }
}

function onKeyUp(e) {
  const key = e.code;
  state.hero.prevAction = state.hero.currentAction;

  for (const action of HERO_ACTIONS) {
    if (action.keys?.includes(key)) {
      switch (state.hero.prevAction) {
        case 'move_top':
          state.hero.currentAction = 'stand_top';
          break;

        case 'move_bottom':
          state.hero.currentAction = 'stand_bottom';
          break;

        case 'move_left':
          state.hero.currentAction = 'stand_left';
          break;

        case 'move_right':
          state.hero.currentAction = 'stand_right';
          break;

        default:
          break;
      }
    }
  }
}

export { onKeyDown, onKeyUp };
