import { Hero } from './classes/Hero.js';
import { heroAssetData } from '../data/heroAssetData.js'; 
import { HERO_POSITION_DEFAULT } from '../data/constants.js';

const heroImg = heroAssetData.src;
const { stand_top } = heroAssetData.actions;

const hero = new Hero({
  imageSrc: heroImg,
  frameX: stand_top.frameX,
  frameY: stand_top.frameY,
  frameXCount: heroAssetData.frameXCount,
  frameYCount: heroAssetData.frameYCount,
  position: HERO_POSITION_DEFAULT,
  fps: heroAssetData.fps,
});

export { hero };
