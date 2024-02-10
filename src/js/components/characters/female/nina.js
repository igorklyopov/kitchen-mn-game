import { Character } from '../../Character';
import { gridCells } from '../../../utils/gridCells';
import { findAssetByName } from '../../../utils/findAssetByName';
import { assetsData } from '../../../data/assetsData';

const ninaSpriteData = findAssetByName(assetsData, 'nina');

const nina = new Character({
  name: 'nina',
  imageSrc: ninaSpriteData.src,
  frameX: ninaSpriteData.animations.standDown.frameX,
  frameY: ninaSpriteData.animations.standDown.frameY,
  frameSize: ninaSpriteData.frameSize,
  frameXMaxNumber: ninaSpriteData.maxNumberOfFramesAlongX,
  frameYNumber: ninaSpriteData.numberOfFramesAlongY,
  animations: ninaSpriteData.animations,
  position: {
    x: gridCells(8),
    y: gridCells(39),
  },
});

export { nina };
