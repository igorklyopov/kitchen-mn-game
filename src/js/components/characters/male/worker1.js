import { Character } from '../../Character';
import { gridCells } from '../../../utils/gridCells';
import { findAssetByName } from '../../../utils/findAssetByName';
import { assetsData } from '../../../data/assetsData';

const worker1SpriteData = findAssetByName(assetsData, 'worker1');

const worker1 = new Character({
  name: 'worker1',
  imageSrc: worker1SpriteData.src,
  frameX: worker1SpriteData.animations.standDown.frameX,
  frameY: worker1SpriteData.animations.standDown.frameY,
  frameSize: worker1SpriteData.frameSize,
  frameXMaxNumber: worker1SpriteData.maxNumberOfFramesAlongX,
  frameYNumber: worker1SpriteData.numberOfFramesAlongY,
  animations: worker1SpriteData.animations,
  position: {
    x: gridCells(54),
    y: gridCells(40),
  },
});

export { worker1 };
