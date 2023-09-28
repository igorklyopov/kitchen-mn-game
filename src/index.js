import { refs } from './js/refs.js';
import { GAME_CANVAS_HEIGHT, GAME_CANVAS_WIDTH } from './js/constants.js';
import { assetsData } from './js/assetsData.js';
import { loadAssets, findImgById } from './js/utils/loadAssets.js';

refs.gameCanvas.width = GAME_CANVAS_WIDTH;
refs.gameCanvas.height = GAME_CANVAS_HEIGHT;
const ctx = refs.gameCanvas.getContext('2d');

loadAssets(assetsData).then((assets) => {
  const gameMapImg = findImgById(assets, 'gameMap');
  const heroImg = findImgById(assets, 'player');

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, refs.gameCanvas.width, refs.gameCanvas.height);
  }
  animate();
});
