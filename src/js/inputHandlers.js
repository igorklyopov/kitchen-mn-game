import { state } from './state/state.js';
import { ACTIONS_NAMES, HERO_ACTIONS } from './data/constants.js';

function onKeyDown(e) {
  const key = e.code;

  for (let i = 0; i < HERO_ACTIONS.length; i += 1) {
    const action = HERO_ACTIONS[i];

    if (action.keys?.includes(key)) {
      state.hero.currentAction = action.name;
      state.hero[action.name] = true;
      state.hero.prevAction = action.name;

      return;
    }
  }
}

function setHeroIdleAction(prevAction) {
  switch (prevAction) {
    case ACTIONS_NAMES.move_top:
      state.hero.currentAction = ACTIONS_NAMES.stand_top;
      break;

    case ACTIONS_NAMES.move_bottom:
      state.hero.currentAction = ACTIONS_NAMES.stand_bottom;
      break;

    case ACTIONS_NAMES.move_left:
      state.hero.currentAction = ACTIONS_NAMES.stand_left;
      break;

    case ACTIONS_NAMES.move_right:
      state.hero.currentAction = ACTIONS_NAMES.stand_right;
      break;

    default:
      break;
  }
}

function onKeyUp(e) {
  const key = e.code;

  for (let i = 0; i < HERO_ACTIONS.length; i += 1) {
    const action = HERO_ACTIONS[i];

    if (action.keys?.includes(key)) {
      state.hero[action.name] = false;
      setHeroIdleAction(state.hero.prevAction);

      return;
    }
  }
}

export { onKeyDown, setHeroIdleAction, onKeyUp };
