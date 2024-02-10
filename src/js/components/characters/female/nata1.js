import { Character } from '../../Character';
import { gridCells } from '../../../utils/gridCells';
import { findAssetByName } from '../../../utils/findAssetByName';
import { assetsData } from '../../../data/assetsData';

const nata1SpriteData = findAssetByName(assetsData, 'nata1');

const nata1 = new Character({
  name: 'nata1',
  imageSrc: nata1SpriteData.src,
  frameX: nata1SpriteData.animations.standUp.frameX,
  frameY: nata1SpriteData.animations.standUp.frameY,
  frameSize: nata1SpriteData.frameSize,
  frameXMaxNumber: nata1SpriteData.maxNumberOfFramesAlongX,
  frameYNumber: nata1SpriteData.numberOfFramesAlongY,
  animations: nata1SpriteData.animations,
  position: {
    x: gridCells(27),
    y: gridCells(15),
  },
});

export { nata1 };
