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
  GAME_LOOP_FPS_DEFAULT,
  DEV_MODE,
  EVENTS_NAMES,
} from '../js/data/constants.js';
import { assetsData } from './data/assetsData.js';
import { findAssetByName } from './utils/findAssetByName.js';
import { collisionBoundaries } from './helpers/collisionBoundaries.js';
// import { GridHelper } from './helpers/GridHelper.js';
import { data2 } from './data/characters/actions.js';
import { events } from './components/Events.js';

const { CONVERSATION_START, CONVERSATION_END } = EVENTS_NAMES;

// Grabbing the canvas to draw to
const canvas = refs.gameCanvas;
canvas.width = GAME_CANVAS_WIDTH;
canvas.height = GAME_CANVAS_HEIGHT;
const ctx = canvas.getContext('2d');

// Establish the root scene
const mainScene = new GameObject({
  name: 'mainScene',
  position: new Vector2({ x: 0, y: 0 }),
});

// Build up the scene by adding  ground and hero
const gameMapSpriteData = findAssetByName(assetsData, 'gameMap');
const gameMapSprite = new Sprite({
  name: 'gameMapSprite',
  imageSrc: gameMapSpriteData.src,
  frameSize: { width: GAME_MAP_WIDTH, height: GAME_MAP_HEIGHT },
});
mainScene.addChild(gameMapSprite);

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

mainScene.addChild(hero);
console.log(hero);

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
    y: gridCells(53),
  },
});
lida.setActions(data2); // for test
lida.isAutoActionPlay = true;
// for test
lida.setMessages([
  {
    id: 'hello',
    text: 'Hello everyone!',
    buttons: [
      {
        key: 'test',
        content: 'test',
        onClick: function (e) {
          this.close();
        },
      },
    ],
  },
]);
mainScene.addChild(lida);
console.log(lida);

events.on(CONVERSATION_START); // for test
events.on(CONVERSATION_END); // for test

const camera = new Camera(hero.position);
// const camera = new Camera();
mainScene.addChild(camera);

// Add an InputHandler class to the main scene

const DIRECTIONS_NAMES = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

const { UP, DOWN, LEFT, RIGHT } = DIRECTIONS_NAMES;

const heroKeyMap = {
  [UP]: ['KeyW', 'Numpad8'],
  [DOWN]: ['KeyS', 'Numpad2'],
  [LEFT]: ['KeyA', 'Numpad4'],
  [RIGHT]: ['KeyD', 'Numpad6'],
  SHOOT: ['KeyQ'], // for test
};
const input = new InputHandler();
input.setKeyMap(heroKeyMap);
input.setDirectionsNames(DIRECTIONS_NAMES);

mainScene.input = input;

// Add gridHelper for test
// const gridHelper = new GridHelper({
//   size: { width: GAME_MAP_WIDTH, height: GAME_MAP_HEIGHT },
//   cellSize: { width: 16, height: 16 },
//   color: 'rgba(244,8,222,1)',
//   canvas,
// });

// Establish update and draw loops
const update = (delta) => {
  mainScene.stepEntry(delta, mainScene);
};
const draw = () => {
  // Clear anything stale
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Activate camera
  camera.track();

  // Save the current state (for camera offset)
  ctx.save();

  // Offset by camera position
  ctx.translate(camera.position.x, camera.position.y);

  // Draw objects in the mounted scene
  mainScene.draw(ctx, 0, 0);

  // for test
  if (DEV_MODE) {
    // gridHelper.draw();
    collisionBoundaries.forEach((boundary) => boundary.draw(ctx));
  }

  // Restore to original state
  ctx.restore();

  // Draw anything above the game world
  // =====
};

// Start the game!
const gameLoop = new GameLoop({
  update,
  render: draw,
  fps: GAME_LOOP_FPS_DEFAULT,
});
gameLoop.start();
