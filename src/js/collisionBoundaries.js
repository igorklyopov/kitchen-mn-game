import { Boundary } from './components/classes/Boundary.js';
import { make2DArray } from './utils/make2DArray.js';
import { collisionMainData } from './data/collisions/collisionMain.js';
import { GAME_MAP_POSITION_DEFAULT } from './data/constants.js';

const { map, width, tileSize } = collisionMainData;
const collisionsMap = make2DArray(map, width);

// for test ===>
// const testBoundary = new Boundary({
//   position: {
//     x: 480,
//     y: 200,
//   },
//   width: tileSize,
//   height: tileSize,
// });
//<===

const collisionBoundaries = [];

collisionsMap.forEach((row, i) => {
  row.forEach((item, j) => {
    const collisionBoundary = new Boundary({
      position: {
        x: j * tileSize + GAME_MAP_POSITION_DEFAULT.x,
        y: i * tileSize + GAME_MAP_POSITION_DEFAULT.y,
      },
      width: tileSize,
      height: tileSize,
      color: 'rgba(244,8,222,0.5)',
    });

    if (item === 1) collisionBoundaries.push(collisionBoundary);
  });
});

export { collisionBoundaries };
