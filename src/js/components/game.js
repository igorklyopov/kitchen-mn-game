import { Game } from './classes/Game';
import { hero } from './hero';
import { background } from './background';
import { refs } from '../data/refs';
import { collisionBoundaries } from '../collisionBoundaries';
import { lida } from './lida';
import { lidaPath } from '../data/characters/lidaData';

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
