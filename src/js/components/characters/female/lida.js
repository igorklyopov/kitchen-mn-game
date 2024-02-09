import { Character } from '../../Character';
import { gridCells } from '../../../utils/gridCells';
import { findAssetByName } from '../../../utils/findAssetByName';
import { assetsData } from '../../../data/assetsData';

const lidaSpriteData = findAssetByName(assetsData, 'lida');

const lida = new Character({
  name: 'lida',
  imageSrc: lidaSpriteData.src,
  frameX: lidaSpriteData.animations.standRight.frameX,
  frameY: lidaSpriteData.animations.standRight.frameY,
  frameSize: lidaSpriteData.frameSize,
  frameXMaxNumber: lidaSpriteData.maxNumberOfFramesAlongX,
  frameYNumber: lidaSpriteData.numberOfFramesAlongY,
  animations: lidaSpriteData.animations,
  position: {
    x: gridCells(44),
    y: gridCells(6),
  },
});

export { lida };
