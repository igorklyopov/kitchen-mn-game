import { Boundary } from './Boundary.js';
import { make2DArray } from '../utils/make2DArray.js';
import { collisionMainData } from '../data/collisions/collisionMain.js';
import { COLLISION_OBJECTS_TYPES } from '../data/constants.js';

const { map, width, tileSize } = collisionMainData;
const collisionsMap = make2DArray(map, width);
const gameMap = [];
const collisionBoundaries = [];
// for test
collisionsMap.forEach((row, y) => {
  row.forEach((item, x) => {
    if (item !== 0) {
      const collisionBoundary = new Boundary({
        name: COLLISION_OBJECTS_TYPES[item],
        position: {
          x: x * tileSize,
          y: y * tileSize,
        },
        width: tileSize,
        height: tileSize,
        color: 'rgba(244,8,222,0.5)',
      });

      collisionBoundaries.push(collisionBoundary);
    }
  });
});

collisionsMap.forEach((row, y) => {
  row.forEach((item, x) => {
    if (item !== 0) {
      const type = COLLISION_OBJECTS_TYPES[item];
      const coordinates = [x * tileSize, y * tileSize];
      const collisionObject = {
        [type]: coordinates,
      };

      gameMap.push(collisionObject);
    }
  });
});

export { gameMap, collisionBoundaries };
