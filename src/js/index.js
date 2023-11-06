import '../styles/style.css';

import { refs } from './data/refs';
import { GAME_CANVAS_WIDTH, GAME_CANVAS_HEIGHT } from './data/constants';
import { onKeyDown, onKeyUp } from './inputHandlers';
import { game } from './components/game';

refs.gameCanvas.width = GAME_CANVAS_WIDTH;
refs.gameCanvas.height = GAME_CANVAS_HEIGHT;

window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

game.animate();
