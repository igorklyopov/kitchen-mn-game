import { Game } from './classes/Game.js';
import { hero } from './hero.js';
import { background } from './background.js';
import { refs } from '../data/refs.js';
import { collisionBoundaries } from '../collisionBoundaries.js';

const game = new Game({
  canvas: refs.gameCanvas,
  hero,
  boundaries: collisionBoundaries,
  renderables: [background, ...collisionBoundaries, hero],
  movables: [background, ...collisionBoundaries],
});

export { game };
