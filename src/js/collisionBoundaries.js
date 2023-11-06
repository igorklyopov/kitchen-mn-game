import { Boundary } from './components/classes/Boundary';
import { make2DArray } from './utils/make2DArray';
import { collisionMainData } from './data/collisions/collisionMain';
import { GAME_MAP_POSITION_DEFAULT } from './data/constants';

const { map, width, tileSize } = collisionMainData;
const collisionsMap = make2DArray(map, width);

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
