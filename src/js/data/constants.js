const DEV_MODE = true; // for test

const GAME_CANVAS_WIDTH = 320;
const GAME_CANVAS_HEIGHT = 180;
const GAME_MAP_WIDTH = 1440;
const GAME_MAP_HEIGHT = 960;
const MOVING_STEP_SIZE = 1;
const GAME_GRID_CELL_SIZE = 1;

const HERO_POSITION_DEFAULT = {
  x: 15,
  y: 57,
};
const MOVEMENT_STEPS_NUMBER = 1; // the number of squares (grid cells, tiles of map grid) the character moves at one time
const DIRECTIONS_NAMES = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};
const ACTIONS_NAMES = {
  STAND: 'STAND',
  WALK: 'WALK',
};

const GAME_LOOP_FPS_DEFAULT = 30; // number frames per second, speed

const COLLISION_OBJECTS_TYPES = {
  1: 'WALL',
  2: '',
};

export {
  DEV_MODE,
  GAME_CANVAS_WIDTH,
  GAME_CANVAS_HEIGHT,
  GAME_MAP_WIDTH,
  GAME_MAP_HEIGHT,
  MOVING_STEP_SIZE,
  GAME_GRID_CELL_SIZE,
  HERO_POSITION_DEFAULT,
  MOVEMENT_STEPS_NUMBER,
  ACTIONS_NAMES,
  DIRECTIONS_NAMES,
  COLLISION_OBJECTS_TYPES,
  GAME_LOOP_FPS_DEFAULT,
};
