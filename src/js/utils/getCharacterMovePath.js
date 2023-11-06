import { GAME_MAP_POSITION_DEFAULT } from '../data/constants';

const getCharacterMovePath = (pathData = []) => {
  const result = [];

  pathData.forEach((item) => {
    const wayPoint = { position: { x: 0, y: 0 } };

    wayPoint.position.x = item.x += GAME_MAP_POSITION_DEFAULT.x;
    wayPoint.position.y = item.y += GAME_MAP_POSITION_DEFAULT.y;

    result.push(wayPoint);
  });

  return result;
};

export { getCharacterMovePath };
