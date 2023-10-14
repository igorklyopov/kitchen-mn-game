import { refs } from './js/data/refs.js';
import {
  GAME_CANVAS_WIDTH,
  GAME_CANVAS_HEIGHT,
  MOVING_STEP,
  ACTIONS_NAMES,
} from './js/data/constants.js';
import { onKeyDown, onKeyUp } from './js/inputHandlers.js';
import {
  collisionBoundaries,
  drawCollisionBoundaries,
} from './js/collisionBoundaries.js';
import { background } from './js/components/background.js';
import { hero } from './js/components/hero.js';
import { state } from './js/state/state.js';
import { checkRectangleCollision } from './js/utils/checkRectangleCollision.js';

refs.gameCanvas.width = GAME_CANVAS_WIDTH;
refs.gameCanvas.height = GAME_CANVAS_HEIGHT;
const ctx = refs.gameCanvas.getContext('2d');

window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

// ====== move objects for hero move simulation ======>
const movableObjects = [background, ...collisionBoundaries];

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

// let lastTime = 0;

// function animate(timeStamp) {
//   const deltaTime = timeStamp - lastTime;
//   lastTime = timeStamp;

//   requestAnimationFrame(animate);
//   ctx.clearRect(0, 0, refs.gameCanvas.width, refs.gameCanvas.height);

//   gameMap.draw(ctx);

//   drawCollisionBoundaries(ctx);

//   hero.draw(ctx);
// }

// animate(0);

////////////////////////////////////////////////////////

const boundaries = collisionBoundaries;

const movables = [background, ...boundaries];
const renderables = [background, ...boundaries, hero];

function animate(moving) {
  const animationId = window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, refs.gameCanvas.width, refs.gameCanvas.height);
  renderables.forEach((renderable) => {
    renderable.draw(ctx);
  });

  makeHeroMovement(moving);
}

function makeHeroMovement(moving) {
  const rectA = {
    width: hero.frameWidth,
    height: hero.frameHeight,
    position: hero.position,
  };

  if (state.hero.move_top && state.hero.prevAction === ACTIONS_NAMES.move_top) {
    for (let i = 0; i < boundaries.length; i += 1) {
      const boundary = boundaries[i];

      if (
        checkRectangleCollision({
          rectA,
          rectB: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + MOVING_STEP,
            },
          },
        })
      ) {
        moving = false;

        break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y += MOVING_STEP;
      });
  } else if (
    state.hero.move_left &&
    state.hero.prevAction === ACTIONS_NAMES.move_left
  ) {
    for (let i = 0; i < boundaries.length; i += 1) {
      const boundary = boundaries[i];
      if (
        checkRectangleCollision({
          rectA,
          rectB: {
            ...boundary,
            position: {
              x: boundary.position.x + MOVING_STEP,
              y: boundary.position.y,
            },
          },
        })
      ) {
        moving = false;

        break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x += MOVING_STEP;
      });
  } else if (
    state.hero.move_bottom &&
    state.hero.prevAction === ACTIONS_NAMES.move_bottom
  ) {
    for (let i = 0; i < boundaries.length; i += 1) {
      const boundary = boundaries[i];
      if (
        checkRectangleCollision({
          rectA,
          rectB: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - MOVING_STEP,
            },
          },
        })
      ) {
        moving = false;

        break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y -= MOVING_STEP;
      });
  } else if (
    state.hero.move_right &&
    state.hero.prevAction === ACTIONS_NAMES.move_right
  ) {
    for (let i = 0; i < boundaries.length; i += 1) {
      const boundary = boundaries[i];
      if (
        checkRectangleCollision({
          rectA,
          rectB: {
            ...boundary,
            position: {
              x: boundary.position.x - MOVING_STEP,
              y: boundary.position.y,
            },
          },
        })
      ) {
        moving = false;

        break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x -= MOVING_STEP;
      });
  }
}
animate(state.background.moving);
