import { refs } from './js/refs.js';
import {
  GAME_CANVAS_HEIGHT,
  GAME_CANVAS_WIDTH,
  GAME_MAP_POSITION_DEFAULT,
  HERO_POSITION_DEFAULT,
} from './js/data/constants.js';
import { assetsData } from './js/data/assetsData.js';
import { loadAssets, findImgById } from './js/utils/loadAssets.js';
import { GameMap } from './js/components/gameMap.js';
import { Hero } from './js/components/hero.js';
import { state } from './js/state/state.js';
import { onKeyDown, onKeyUp } from './js/inputHandlers.js';
import { heroAssetData } from './js/data/heroAssetData.js';

refs.gameCanvas.width = GAME_CANVAS_WIDTH;
refs.gameCanvas.height = GAME_CANVAS_HEIGHT;
const ctx = refs.gameCanvas.getContext('2d');

const { stand_top } = heroAssetData.actions;

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
    frameX: stand_top.frameX,
    frameY: stand_top.frameY,
    frameWidth: heroImg.width / heroAssetData.frameXCount,
    frameHeight: heroImg.height / heroAssetData.frameYCount,
    canvas: refs.gameCanvas,
    position: HERO_POSITION_DEFAULT,
    fps: heroAssetData.fps,
  });

  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);

  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, refs.gameCanvas.width, refs.gameCanvas.height);

    gameMap.draw();
    gameMap.makeAction(state.hero.currentAction);

    hero.draw();
    hero.makeAction(state.hero.currentAction, deltaTime);
  }
  animate(0);
});
