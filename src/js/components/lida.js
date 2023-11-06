import { Character } from './classes/Character';
import { findAssetByName } from '../utils/findAssetByName';
import { assetsData } from '../data/assetsData';
import { lidaPath } from '../data/characters/lidaData';

const lidaAssetData = findAssetByName(assetsData, 'lida');
const lidaImg = lidaAssetData.src;
const { standRight } = lidaAssetData.actions;

const lida = new Character({
  imageSrc: lidaImg,
  frameX: standRight.frameX,
  frameY: standRight.frameY,
  frameXCount: lidaAssetData.frameXCount,
  frameYCount: lidaAssetData.frameYCount,
  position: {
    x: lidaPath[0].position.x,
    y: lidaPath[0].position.y,
  },
  path: lidaPath,
  fps: lidaAssetData.fps / 2,
  name: 'lida',
});

export { lida };
