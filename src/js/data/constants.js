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
const MOVING_STEP = 1;
const ACTIONS_NAMES = {
  move_top: 'move_top',
  move_bottom: 'move_bottom',
  move_left: 'move_left',
  move_right: 'move_right',
  stand_top: 'stand_top',
  stand_bottom: 'stand_bottom',
  stand_left: 'stand_left',
  stand_right: 'stand_right',
};
const HERO_ACTIONS = [
  { name: ACTIONS_NAMES.move_top, keys: ['KeyW', 'Numpad8'] },
  { name: ACTIONS_NAMES.move_bottom, keys: ['KeyS', 'Numpad2'] },
  { name: ACTIONS_NAMES.move_left, keys: ['KeyA', 'Numpad4'] },
  { name: ACTIONS_NAMES.move_right, keys: ['KeyD', 'Numpad6'] },
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
