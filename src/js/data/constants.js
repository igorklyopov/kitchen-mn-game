const GAME_CANVAS_WIDTH = 320;
const GAME_CANVAS_HEIGHT = 180;
const GAME_MAP_WIDTH = 1440;
const GAME_MAP_HEIGHT = 960;
const GRID_SIZE = 16;

const HERO_POSITION_DEFAULT = {
  x: 15,
  y: 57,
};
const MOVING_STEP = 1; // the number of squares the hero moves at one time
const ACTIONS_NAMES = {
  WALK_UP: 'WALK_UP',
  WALK_DOWN: 'WALK_DOWN',
  WALK_LEFT: 'WALK_LEFT',
  WALK_RIGHT: 'WALK_RIGHT',
  STAND_UP: 'STAND_UP',
  STAND_DOWN: 'STAND_DOWN',
  STAND_LEFT: 'STAND_LEFT',
  STAND_RIGHT: 'STAND_RIGHT',
};
const HERO_ACTIONS_KEYS = {
  WALK_UP: ['KeyW', 'Numpad8'],
  WALK_DOWN: ['KeyS', 'Numpad2'],
  WALK_LEFT: ['KeyA', 'Numpad4'],
  WALK_RIGHT: ['KeyD', 'Numpad6'],
};

const COLLISION_OBJECTS_TYPES = {
  1: 'wall',
  2: '',
};

export {
  GAME_CANVAS_WIDTH,
  GAME_CANVAS_HEIGHT,
  GAME_MAP_WIDTH,
  GAME_MAP_HEIGHT,
  GRID_SIZE,
  HERO_POSITION_DEFAULT,
  MOVING_STEP,
  ACTIONS_NAMES,
  HERO_ACTIONS_KEYS,
  COLLISION_OBJECTS_TYPES,
};
