import { Character } from '../../Character';
import { gridCells } from '../../../utils/gridCells';
import { findAssetByName } from '../../../utils/findAssetByName';
import { assetsData } from '../../../data/assetsData';

const worker2SpriteData = findAssetByName(assetsData, 'worker2');

const worker2 = new Character({
  name: 'worker2',
  imageSrc: worker2SpriteData.src,
  frameX: worker2SpriteData.animations.standLeft.frameX,
  frameY: worker2SpriteData.animations.standLeft.frameY,
  frameSize: worker2SpriteData.frameSize,
  frameXMaxNumber: worker2SpriteData.maxNumberOfFramesAlongX,
  frameYNumber: worker2SpriteData.numberOfFramesAlongY,
  animations: worker2SpriteData.animations,
  position: {
    x: gridCells(42),
    y: gridCells(21),
  },
});

export { worker2 };
