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

export {
  GAME_CANVAS_WIDTH,
  GAME_CANVAS_HEIGHT,
  GAME_MAP_POSITION_DEFAULT,
  HERO_POSITION_DEFAULT,
  HERO_ACTIONS,
};
