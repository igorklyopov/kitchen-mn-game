import { refs } from './js/data/refs.js';
import {
  GAME_CANVAS_HEIGHT,
  GAME_CANVAS_WIDTH,
  MOVING_STEP,
} from './js/data/constants.js';

import { onKeyDown, onKeyUp } from './js/inputHandlers.js';
import {
  collisionBoundaries,
  drawCollisionBoundaries,
} from './js/collisions.js';
import { gameMap } from './js/components/gameMap.js';
import { hero } from './js/components/hero.js';
import { keys, state } from './js/data/constants.js';
import { checkRectangleCollision } from './js/utils/checkRectangleCollision.js';

refs.gameCanvas.width = GAME_CANVAS_WIDTH;
refs.gameCanvas.height = GAME_CANVAS_HEIGHT;
const ctx = refs.gameCanvas.getContext('2d');

window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

// ====== move objects for hero move simulation ======>
const movableObjects = [gameMap, ...collisionBoundaries];

const moveObjects = (objects, action) => {
  objects.forEach((object) => {
    switch (action) {
      case 'move_top':
        object.position.y += MOVING_STEP;
        break;

      case 'move_bottom':
        object.position.y -= MOVING_STEP;
        break;

      case 'move_left':
        object.position.x += MOVING_STEP;
        break;

      case 'move_right':
        object.position.x -= MOVING_STEP;
        break;

      default:
        break;
    }
  });
};
// <====== ======

let lastTime = 0;

function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, refs.gameCanvas.width, refs.gameCanvas.height);

  gameMap.draw(ctx);

  drawCollisionBoundaries(ctx);

  hero.draw(ctx);
}

animate(0);
