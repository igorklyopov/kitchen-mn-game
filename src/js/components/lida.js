import { Character } from './classes/Character.js';
import { findAssetByName } from '../utils/findAssetByName.js';
import { assetsData } from '../data/assetsData.js';
import { lidaPath } from '../data/characters/lidaData.js';
import { GAME_MAP_POSITION_DEFAULT } from '../data/constants.js';

const lidaAssetData = findAssetByName(assetsData, 'lida');
const lidaImg = lidaAssetData.src;
const { stand_right } = lidaAssetData.actions;

const lida = new Character({
  imageSrc: lidaImg,
  frameX: stand_right.frameX,
  frameY: stand_right.frameY,
  frameXCount: lidaAssetData.frameXCount,
  frameYCount: lidaAssetData.frameYCount,
  position: {
    x: lidaPath[0].x + GAME_MAP_POSITION_DEFAULT.x,
    y: lidaPath[0].y + GAME_MAP_POSITION_DEFAULT.y,
  },
});


export { lida };