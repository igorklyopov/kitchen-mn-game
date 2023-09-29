const GAME_CANVAS_WIDTH = 1024;
const GAME_CANVAS_HEIGHT = 576;
const GAME_MAP_POSITION_DEFAULT = {
  x: 240,
  y: -985,
};
const HERO_POSITION_DEFAULT = {
  x: 450,
  y: 250,
};
const HERO_ACTIONS = {
  move_top: 'move_top',
  move_bottom: 'move_bottom',
  move_left: 'move_left',
  move_right: 'move_right',
  stand_top: 'stand_top',
  stand_bottom: 'stand_bottom',
  stand_left: 'stand_left',
  stand_right: 'stand_right',
};

export {
  GAME_CANVAS_WIDTH,
  GAME_CANVAS_HEIGHT,
  GAME_MAP_POSITION_DEFAULT,
  HERO_POSITION_DEFAULT,
  HERO_ACTIONS,
};