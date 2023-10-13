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
const HERO_ACTIONS = [
  { name: 'move_top', keys: ['KeyW', 'Numpad8'] },
  { name: 'move_bottom', keys: ['KeyS', 'Numpad2'] },
  { name: 'move_left', keys: ['KeyA', 'Numpad4'] },
  { name: 'move_right', keys: ['KeyD', 'Numpad6'] },
  { name: 'stand_top' },
  { name: 'stand_bottom' },
  { name: 'stand_left' },
  { name: 'stand_right' },
];

const keys = {
  Numpad8: {
    pressed: false,
  },
  Numpad4: {
    pressed: false,
  },
  Numpad2: {
    pressed: false,
  },
  Numpad6: {
    pressed: false,
  },
};

const state = { lastKey: '', move: true };

export {
  GAME_CANVAS_WIDTH,
  GAME_CANVAS_HEIGHT,
  GAME_MAP_POSITION_DEFAULT,
  HERO_POSITION_DEFAULT,
  MOVING_STEP,
  HERO_ACTIONS,
  keys,
  state,
};
