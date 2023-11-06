import { Hero } from './classes/Hero';
import { heroAssetData } from '../data/heroAssetData';
import { HERO_POSITION_DEFAULT } from '../data/constants';

const heroImg = heroAssetData.src;
const { standTop } = heroAssetData.actions;

const hero = new Hero({
  imageSrc: heroImg,
  frameX: standTop.frameX,
  frameY: standTop.frameY,
  frameXCount: heroAssetData.frameXCount,
  frameYCount: heroAssetData.frameYCount,
  position: HERO_POSITION_DEFAULT,
  fps: heroAssetData.fps,
});

export { hero };
