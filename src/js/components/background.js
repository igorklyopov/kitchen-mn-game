import { Background } from './classes/Background';
import { findAssetByName } from '../utils/findAssetByName';
import { assetsData } from '../data/assetsData';
import { GAME_MAP_POSITION_DEFAULT } from '../data/constants';

const gameMapAssetData = findAssetByName(assetsData, 'gameMap');

const gameMapImg = gameMapAssetData.src;

const background = new Background({
  imageSrc: gameMapImg,
  position: GAME_MAP_POSITION_DEFAULT,
});

export { background };
