import { Character } from '../Character';
import { gridCells } from '../../utils/gridCells';
import { findAssetByName } from '../../utils/findAssetByName';
import { assetsData } from '../../data/assetsData';
import { HERO_POSITION_DEFAULT } from '../../data/constants';

const heroSpriteData = findAssetByName(assetsData, 'hero');

const hero = new Character({
  name: 'hero',
  isPlayerControlled: true,
  imageSrc: heroSpriteData.src,
  frameX: heroSpriteData.animations.standUp.frameX,
  frameY: heroSpriteData.animations.standUp.frameY,
  frameSize: heroSpriteData.frameSize,
  frameXMaxNumber: heroSpriteData.maxNumberOfFramesAlongX,
  frameYNumber: heroSpriteData.numberOfFramesAlongY,
  animations: heroSpriteData.animations,
  position: {
    x: gridCells(HERO_POSITION_DEFAULT.x),
    y: gridCells(HERO_POSITION_DEFAULT.y),
  },
});

export { hero };
