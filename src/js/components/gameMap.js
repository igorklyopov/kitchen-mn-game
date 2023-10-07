import { GameMap } from './classes/GameMap.js';
import { findAssetByName } from '../utils/findAssetByName.js';
import { assetsData } from '../data/assetsData.js';
import { GAME_MAP_POSITION_DEFAULT } from '../data/constants.js';

const gameMapAssetData = findAssetByName(assetsData, 'gameMap');

const gameMapImg = gameMapAssetData.src;

const gameMap = new GameMap({
  imageSrc: gameMapImg,
  position: GAME_MAP_POSITION_DEFAULT,
});

export { gameMap };
