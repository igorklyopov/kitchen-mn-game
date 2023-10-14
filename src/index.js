import { refs } from './js/data/refs.js';
import {
  GAME_CANVAS_WIDTH,
  GAME_CANVAS_HEIGHT,
  GAME_MAP_POSITION_DEFAULT,
  MOVING_STEP,
} from './js/data/constants.js';
import { onKeyDown, onKeyUp } from './js/inputHandlers.js';
import {
  collisionBoundaries,
  drawCollisionBoundaries,
} from './js/collisionBoundaries.js';
import { background } from './js/components/background.js';
import { hero } from './js/components/hero.js';
// import { keys} from './js/data/constants.js';
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

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

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

  if (keys.w.pressed && state.lastKey === 'w') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      if (
        checkRectangleCollision({
          rectA,
          rectB: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 3,
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
        movable.position.y += 3;
      });
  } else if (keys.a.pressed && state.lastKey === 'a') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        checkRectangleCollision({
          rectA,
          rectB: {
            ...boundary,
            position: {
              x: boundary.position.x + 3,
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
        movable.position.x += 3;
      });
  } else if (keys.s.pressed && state.lastKey === 's') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        checkRectangleCollision({
          rectA,
          rectB: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 3,
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
        movable.position.y -= 3;
      });
  } else if (keys.d.pressed && state.lastKey === 'd') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        checkRectangleCollision({
          rectA,
          rectB: {
            ...boundary,
            position: {
              x: boundary.position.x - 3,
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
        movable.position.x -= 3;
      });
  }
}
animate(state.moving);

window.addEventListener('keydown', (e) => {
  console.log(state);
  switch (e.key) {
    case 'w':
      keys.w.pressed = true;
      state.lastKey = 'w';

      break;
    case 'a':
      keys.a.pressed = true;
      state.lastKey = 'a';
      break;

    case 's':
      keys.s.pressed = true;
      state.lastKey = 's';
      break;

    case 'd':
      keys.d.pressed = true;
      state.lastKey = 'd';
      break;
  }
});

window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;
    case 's':
      keys.s.pressed = false;
      break;
    case 'd':
      keys.d.pressed = false;
      break;
  }
});
