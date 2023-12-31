import { game } from './components/game.js';

function onKeyDown(e) {
  game.onKeyDown.bind(game);
  game.onKeyDown(e);
}

function onKeyUp(e) {
  game.onKeyUp.bind(game);
  game.onKeyUp(e);
}

export { onKeyDown, onKeyUp };
