import { refs } from './js/data/refs.js';
import {
  GAME_CANVAS_HEIGHT,
  GAME_CANVAS_WIDTH,
  GAME_MAP_POSITION_DEFAULT,
  HERO_POSITION_DEFAULT,
  HERO_ACTIONS, //
} from './js/data/constants.js';
import { assetsData } from './js/data/assetsData.js';
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
import { findAssetByName } from './js/utils/findAssetByName.js';

refs.gameCanvas.width = GAME_CANVAS_WIDTH;
refs.gameCanvas.height = GAME_CANVAS_HEIGHT;
const ctx = refs.gameCanvas.getContext('2d');

const { stand_top } = heroAssetData.actions;
const gameMapAssetData = findAssetByName(assetsData, 'gameMap');

const gameMapImg = gameMapAssetData.src;
const heroImg = heroAssetData.src;

const gameMap = new GameMap({
  imageSrc: gameMapImg,
  position: GAME_MAP_POSITION_DEFAULT,
});

const hero = new Hero({
  imageSrc: heroImg,
  frameX: stand_top.frameX,
  frameY: stand_top.frameY,
  frameXCount: heroAssetData.frameXCount,
  frameYCount: heroAssetData.frameYCount,
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

  gameMap.draw(ctx);

  drawCollisionBoundaries(ctx);
  moveObjects(movableObjects, state.hero.currentAction);

  hero.draw(ctx);
  hero.makeAction(state.hero.currentAction, deltaTime);
}

animate(0);
