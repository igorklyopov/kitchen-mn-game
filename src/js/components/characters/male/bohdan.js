import { Character } from '../../Character';
import { gridCells } from '../../../utils/gridCells';
import { findAssetByName } from '../../../utils/findAssetByName';
import { assetsData } from '../../../data/assetsData';

const bohdanSpriteData = findAssetByName(assetsData, 'bohdan');

const bohdan = new Character({
  name: 'bohdan',
  imageSrc: bohdanSpriteData.src,
  frameX: bohdanSpriteData.animations.standRight.frameX,
  frameY: bohdanSpriteData.animations.standRight.frameY,
  frameSize: bohdanSpriteData.frameSize,
  frameXMaxNumber: bohdanSpriteData.maxNumberOfFramesAlongX,
  frameYNumber: bohdanSpriteData.numberOfFramesAlongY,
  animations: bohdanSpriteData.animations,
  position: {
    x: gridCells(57),
    y: gridCells(4),
  },
});

export { bohdan };
