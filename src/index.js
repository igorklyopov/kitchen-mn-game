import { refs } from './js/refs.js';
import {
  GAME_CANVAS_HEIGHT,
  GAME_CANVAS_WIDTH,
  GAME_MAP_POSITION_DEFAULT,
  HERO_POSITION_DEFAULT,
} from './js/constants.js';
import { assetsData } from './js/assetsData.js';
import { loadAssets, findImgById } from './js/utils/loadAssets.js';
import { GameMap } from './js/components/gameMap.js';
import { Hero } from './js/components/hero.js';
import { state } from './js/state/state.js';
import { onKeyDown, onKeyUp } from './js/inputHandlers.js';

refs.gameCanvas.width = GAME_CANVAS_WIDTH;
refs.gameCanvas.height = GAME_CANVAS_HEIGHT;
const ctx = refs.gameCanvas.getContext('2d');

loadAssets(assetsData).then((assets) => {
  const gameMapImg = findImgById(assets, 'gameMap');
  const heroImg = findImgById(assets, 'hero');

  const gameMap = new GameMap({
    image: gameMapImg,
    canvas: refs.gameCanvas,
    position: GAME_MAP_POSITION_DEFAULT,
  });

  const hero = new Hero({
    image: heroImg,
    canvas: refs.gameCanvas,
    position: HERO_POSITION_DEFAULT,
  });

  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, refs.gameCanvas.width, refs.gameCanvas.height);

    gameMap.draw();
    gameMap.makeAction(state.hero.currentAction);

    hero.draw();
    hero.makeAction(state.hero.currentAction);
  }
  animate();
});
