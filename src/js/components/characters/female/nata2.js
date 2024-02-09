import { Character } from '../../Character';
import { gridCells } from '../../../utils/gridCells';
import { findAssetByName } from '../../../utils/findAssetByName';
import { assetsData } from '../../../data/assetsData';

const nata2SpriteData = findAssetByName(assetsData, 'nata2');

const nata2 = new Character({
  name: 'nata2',
  imageSrc: nata2SpriteData.src,
  frameX: nata2SpriteData.animations.standUp.frameX,
  frameY: nata2SpriteData.animations.standUp.frameY,
  frameSize: nata2SpriteData.frameSize,
  frameXMaxNumber: nata2SpriteData.maxNumberOfFramesAlongX,
  frameYNumber: nata2SpriteData.numberOfFramesAlongY,
  animations: nata2SpriteData.animations,
  position: {
    x: gridCells(24),
    y: gridCells(4),
  },
});

export { nata2 };
