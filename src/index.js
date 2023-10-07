import { refs } from './js/data/refs.js';
import {
  GAME_CANVAS_HEIGHT,
  GAME_CANVAS_WIDTH,
  GAME_MAP_POSITION_DEFAULT,
  HERO_POSITION_DEFAULT,
  HERO_ACTIONS, //
} from './js/data/constants.js';
import { assetsData } from './js/data/assetsData.js';
import { loadAssets, findImgById } from './js/utils/loadAssets.js';
import { GameMap } from './js/components/classes/GameMap.js';
import { Hero } from './js/components/classes/Hero.js';
import { state } from './js/state/state.js';
import { onKeyDown, onKeyUp } from './js/inputHandlers.js';
import { heroAssetData } from './js/data/heroAssetData.js';
import {
  collisionBoundaries,
  drawCollisionBoundaries,
} from './js/collisions.js';
import { checkRectangleCollision } from './js/utils/checkRectangleCollision.js';

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

  window.addEventListener('keydown', onKeyDown_1);
  window.addEventListener('keyup', onKeyUp);

  // ========= collision ===========

  const movableObjects = [gameMap, ...collisionBoundaries];

  const moveObjects = (objects, action) => {
    objects.forEach((object) => {
      switch (action) {
        case 'move_top':
          object.position.y += 1;
          break;

        case 'move_bottom':
          object.position.y -= 1;
          break;

        case 'move_left':
          object.position.x += 1;
          break;

        case 'move_right':
          object.position.x -= 1;
          break;

        default:
          break;
      }
    });
  };

  function onKeyDown_1(e) {
    const checkCollision = () => {
      for (let i = 0; i < collisionBoundaries.length; i += 1) {
        const boundary = collisionBoundaries[i];

        const rectA = {
          x: hero.position.x,
          y: hero.position.y,
          width: hero.frameWidth,
          height: hero.frameHeight,
        };

        const rectB = {
          x: boundary.position.x,
          y: boundary.position.y,
          width: boundary.width,
          height: boundary.height,
        };

        const isColliding = checkRectangleCollision(rectA, rectB);

        if (isColliding) {
          console.log('isColliding');
        }
      }
    };

    const key = e.code;
    for (const action of HERO_ACTIONS) {
      if (action.keys?.includes(key)) {
        if (action.name.includes('move')) checkCollision();
        state.hero.currentAction = action.name;
        return;
      }
    }
  }

  // ====================

  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, refs.gameCanvas.width, refs.gameCanvas.height);

    gameMap.draw();

    drawCollisionBoundaries(ctx);
    moveObjects(movableObjects, state.hero.currentAction);

    hero.draw();
    hero.makeAction(state.hero.currentAction, deltaTime);
  }
  animate(0);
});
