import { Character } from '../../Character';
import { gridCells } from '../../../utils/gridCells';
import { findAssetByName } from '../../../utils/findAssetByName';
import { assetsData } from '../../../data/assetsData';

const romaSpriteData = findAssetByName(assetsData, 'roma');

const roma = new Character({
  name: 'roma',
  imageSrc: romaSpriteData.src,
  frameX: romaSpriteData.animations.standUp.frameX,
  frameY: romaSpriteData.animations.standUp.frameY,
  frameSize: romaSpriteData.frameSize,
  frameXMaxNumber: romaSpriteData.maxNumberOfFramesAlongX,
  frameYNumber: romaSpriteData.numberOfFramesAlongY,
  animations: romaSpriteData.animations,
  position: {
    x: gridCells(28),
    y: gridCells(31),
  },
});

export { roma };
