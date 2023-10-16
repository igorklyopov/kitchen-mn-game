import { refs } from './js/data/refs.js';
import { GAME_CANVAS_WIDTH, GAME_CANVAS_HEIGHT } from './js/data/constants.js';
import { onKeyDown, onKeyUp } from './js/inputHandlers.js';
import { game } from './js/components/game.js';

refs.gameCanvas.width = GAME_CANVAS_WIDTH;
refs.gameCanvas.height = GAME_CANVAS_HEIGHT;

window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

game.animate();
