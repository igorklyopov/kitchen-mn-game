import { Game } from './classes/Game.js';
import { hero } from './hero.js';
import { background } from './background.js';
import { refs } from '../data/refs.js';
import { collisionBoundaries } from '../collisionBoundaries.js';
import { lida } from './lida.js';
import { lidaPath } from '../data/characters/lidaData.js';

const characters = [lida];

const game = new Game({
  canvas: refs.gameCanvas,
  hero,
  boundaries: collisionBoundaries,
  characters,
  renderables: [background, ...collisionBoundaries, hero, ...characters],
  movables: [background, ...collisionBoundaries, ...characters, ...lidaPath],
});

export { game };
