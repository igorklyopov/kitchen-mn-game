import { Hero } from './classes/Hero';
import { heroAssetData } from '../data/heroAssetData';
import { HERO_POSITION_DEFAULT } from '../data/constants';

const heroImg = heroAssetData.src;

const hero = new Hero({
  imageSrc: heroImg,
  frameX: heroAssetData.animations.standUp.frameX,
  frameY: heroAssetData.animations.standUp.frameY,
  frameSize: heroAssetData.frameSize,
  frameXMaxNumber: heroAssetData.maxNumberOfFramesAlongX,
  frameYNumber: heroAssetData.numberOfFramesAlongY,
  animations: heroAssetData.animations,
  position: HERO_POSITION_DEFAULT,
});

export { hero };
