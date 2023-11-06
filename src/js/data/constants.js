const GAME_CANVAS_WIDTH = 1024;
const GAME_CANVAS_HEIGHT = 576;
const GAME_MAP_POSITION_DEFAULT = {
  x: 240,
  y: -660,
};
const HERO_POSITION_DEFAULT = {
  x: 480,
  y: 250,
};
const MOVING_STEP = 2;
const ACTIONS_NAMES = {
  moveTop: 'moveTop',
  moveBottom: 'moveBottom',
  moveLeft: 'moveLeft',
  moveRight: 'moveRight',
  standTop: 'standTop',
  standBottom: 'standBottom',
  standLeft: 'standLeft',
  standRight: 'standRight',
};
const HERO_ACTIONS = [
  { name: ACTIONS_NAMES.moveTop, keys: ['KeyW', 'Numpad8'] },
  { name: ACTIONS_NAMES.moveBottom, keys: ['KeyS', 'Numpad2'] },
  { name: ACTIONS_NAMES.moveLeft, keys: ['KeyA', 'Numpad4'] },
  { name: ACTIONS_NAMES.moveRight, keys: ['KeyD', 'Numpad6'] },
];

export {
  GAME_CANVAS_WIDTH,
  GAME_CANVAS_HEIGHT,
  GAME_MAP_POSITION_DEFAULT,
  HERO_POSITION_DEFAULT,
  MOVING_STEP,
  ACTIONS_NAMES,
  HERO_ACTIONS,
};
