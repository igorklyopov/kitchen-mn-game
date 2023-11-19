import '../styles/style.css';

import { Sprite } from './components/Sprite.js';
import { Vector2 } from './components/Vector2.js';
import { GameLoop } from './components/GameLoop.js';
import { InputHandler } from './components/InputHandler.js';
import { GameObject } from './components/GameObject.js';
import { Hero } from './components/Hero.js';
import { Camera } from './components/Camera.js';
import { gridCells } from './utils/gridCells.js';
import { refs } from './data/refs.js';
import {
  GAME_CANVAS_WIDTH,
  GAME_CANVAS_HEIGHT,
  GAME_MAP_WIDTH,
  GAME_MAP_HEIGHT,
  HERO_POSITION_DEFAULT,
} from '../js/data/constants.js';
import { findAssetByName } from './utils/findAssetByName.js';
import { assetsData } from './data/assetsData.js';
import { collisionBoundaries } from './helpers/collisionBoundaries.js';

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

const hero = new Hero({
  x: gridCells(HERO_POSITION_DEFAULT.x),
  y: gridCells(HERO_POSITION_DEFAULT.y),
});
mainScene.addChild(hero);
// console.log(hero);

const camera = new Camera();
mainScene.addChild(camera);

// add boundaries
collisionBoundaries.forEach((boundary) => mainScene.addChild(boundary));

// Add an InputHandler class to the main scene
mainScene.input = new InputHandler();

// console.log(mainScene);

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

  // Restore to original state
  ctx.restore();

  // Draw anything above the game world
  // =====
};

// Start the game!
const gameLoop = new GameLoop(update, draw);
gameLoop.start();
