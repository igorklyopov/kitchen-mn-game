import '../styles/style.css';

import { Sprite } from './components/Sprite.js';
import { Vector2 } from './components/Vector2.js';
import { GameLoop } from './components/GameLoop.js';
import { InputHandler } from './components/InputHandler.js';
import { GameObject } from './components/GameObject.js';
import { Character } from './components/Character.js';
import { Camera } from './components/Camera.js';
import { gridCells } from './utils/gridCells.js';
import { refs } from './data/refs.js';
import {
  GAME_CANVAS_WIDTH,
  GAME_CANVAS_HEIGHT,
  GAME_MAP_WIDTH,
  GAME_MAP_HEIGHT,
  HERO_POSITION_DEFAULT,
  DEV_MODE,
} from '../js/data/constants.js';
import { assetsData } from './data/assetsData.js';
import { findAssetByName } from './utils/findAssetByName.js';
import { collisionBoundaries } from './helpers/collisionBoundaries.js';
import { GridHelper } from './helpers/GridHelper.js';

// Grabbing the canvas to draw to
const canvas = refs.gameCanvas;
canvas.width = GAME_CANVAS_WIDTH;
canvas.height = GAME_CANVAS_HEIGHT;
const ctx = canvas.getContext('2d');

// Establish the root scene
const mainScene = new GameObject({
  name: 'mainScene',
  position: new Vector2(0, 0),
});

// Build up the scene by adding a, ground, and hero
const gameMapSpriteData = findAssetByName(assetsData, 'gameMap');
const gameMapSprite = new Sprite({
  name: 'gameMapSprite',
  imageSrc: gameMapSpriteData.src,
  frameSize: { width: GAME_MAP_WIDTH, height: GAME_MAP_HEIGHT },
});
mainScene.addChild(gameMapSprite);
/// ///////////////////////////////
// for test
const data2 = {
  repeat: true,
  data: [
    { action: 'STAND_UP', time: 3000 },
    { action: 'WALK_UP', distance: 3 },
    { action: 'WALK_RIGHT', distance: 6 },
    { action: 'WALK_DOWN', distance: 3 },
    { action: 'WALK_LEFT', distance: 6 },
    { action: 'WALK_UP', distance: 3 },
  ],
};
/// //////////////////////////////
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
// hero.autoActions = data2;
// hero.isAutoActionPlay = true;
mainScene.addChild(hero);

const lidaSpriteData = findAssetByName(assetsData, 'lida');

const lida = new Character({
  name: 'lida',
  imageSrc: lidaSpriteData.src,
  frameX: lidaSpriteData.animations.standUp.frameX,
  frameY: lidaSpriteData.animations.standUp.frameY,
  frameSize: lidaSpriteData.frameSize,
  frameXMaxNumber: lidaSpriteData.maxNumberOfFramesAlongX,
  frameYNumber: lidaSpriteData.numberOfFramesAlongY,
  animations: lidaSpriteData.animations,
  position: {
    x: gridCells(15),
    y: gridCells(55),
  },
});
lida.autoActions = data2;
// lida.isAutoActionPlay = true;
// mainScene.addChild(lida);

const camera = new Camera();
mainScene.addChild(camera);

// Add an InputHandler class to the main scene
mainScene.input = new InputHandler();

// Add gridHelper for test
const gridHelper = new GridHelper({
  size: { width: GAME_MAP_WIDTH, height: GAME_MAP_HEIGHT },
  cellSize: { width: 16, height: 16 },
  color: 'rgba(244,8,222,1)',
  canvas,
});

// Establish update and draw loops
const update = (delta) => {
  mainScene.stepEntry(delta, mainScene);
};
const draw = () => {
  // Clear anything stale
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Save the current state (for camera offset)
  ctx.save();

  // Offset by camera position
  ctx.translate(camera.position.x, camera.position.y);

  // Draw objects in the mounted scene
  mainScene.draw(ctx, 0, 0);

  // for test
  if (DEV_MODE) {
    gridHelper.draw();
    collisionBoundaries.forEach((boundary) => boundary.draw(ctx));
  }

  // Restore to original state
  ctx.restore();

  // Draw anything above the game world
  // =====
};

// Start the game!
const gameLoop = new GameLoop(update, draw);
gameLoop.start();
