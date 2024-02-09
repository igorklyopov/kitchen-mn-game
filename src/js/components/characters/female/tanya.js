import { Character } from '../../Character';
import { gridCells } from '../../../utils/gridCells';
import { findAssetByName } from '../../../utils/findAssetByName';
import { assetsData } from '../../../data/assetsData';

const tanyaSpriteData = findAssetByName(assetsData, 'tanya');

const tanya = new Character({
  name: 'tanya',
  imageSrc: tanyaSpriteData.src,
  frameX: tanyaSpriteData.animations.standDown.frameX,
  frameY: tanyaSpriteData.animations.standDown.frameY,
  frameSize: tanyaSpriteData.frameSize,
  frameXMaxNumber: tanyaSpriteData.maxNumberOfFramesAlongX,
  frameYNumber: tanyaSpriteData.numberOfFramesAlongY,
  animations: tanyaSpriteData.animations,
  position: {
    x: gridCells(28),
    y: gridCells(23),
  },
});

export { tanya };
