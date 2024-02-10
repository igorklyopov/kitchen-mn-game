import '../styles/style.css';

import { Sprite } from './components/Sprite.js';
import { Vector2 } from './components/Vector2.js';
import { GameLoop } from './components/GameLoop.js';
import { InputHandler } from './components/InputHandler.js';
import { GameObject } from './components/GameObject.js';
import { Camera } from './components/Camera.js';
import { refs } from './data/refs.js';
import {
  GAME_CANVAS_WIDTH,
  GAME_CANVAS_HEIGHT,
  GAME_MAP_WIDTH,
  GAME_MAP_HEIGHT,
  GAME_LOOP_FPS_DEFAULT,
  DEV_MODE,
  EVENTS_NAMES,
  DIRECTIONS_NAMES,
} from '../js/data/constants.js';
import { assetsData } from './data/assetsData.js';
import { findAssetByName } from './utils/findAssetByName.js';
import { collisionBoundaries } from './helpers/collisionBoundaries.js';
// import { GridHelper } from './helpers/GridHelper.js';

import { hero } from './components/characters/hero.js';
import { lida } from './components/characters/female/lida.js';
import { nata1 } from './components/characters/female/nata1.js';
import { nata2 } from './components/characters/female/nata2.js';
import { tanya } from './components/characters/female/tanya.js';
import { bohdan } from './components/characters/male/bohdan.js';
import { roma } from './components/characters/male/roma.js';
import { worker1 } from './components/characters/male/worker1.js';
import { worker2 } from './components/characters/male/worker2.js';

import { lidaActions, nata1Actions } from './data/characters/actions.js';
import { charactersConversationData } from './data/characters/charactersConversationData.js';
import { events } from './components/Events.js';
import { Dialog } from './components/Conversation/Dialog.js';

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

// Build up the scene by adding  ground
const gameMapSpriteData = findAssetByName(assetsData, 'gameMap');
const gameMapSprite = new Sprite({
  name: 'gameMapSprite',
  imageSrc: gameMapSpriteData.src,
  frameSize: { width: GAME_MAP_WIDTH, height: GAME_MAP_HEIGHT },
});
mainScene.addChild(gameMapSprite);

// hero
mainScene.addChild(hero);
// console.log(hero);

// lida
lida.setActions(lidaActions);
lida.isAutoActionPlay = true;
mainScene.addChild(lida);
// console.log(lida);

// nata1
nata1.setActions(nata1Actions);
nata1.isAutoActionPlay = true;
mainScene.addChild(nata1);

// nata2
mainScene.addChild(nata2);

// tanya
mainScene.addChild(tanya);

// bohdan
mainScene.addChild(bohdan);

// roma
mainScene.addChild(roma);

// worker1
mainScene.addChild(worker1);

// worker2
mainScene.addChild(worker2);

// camera
const camera = new Camera(hero.position);
mainScene.addChild(camera);

// Add an InputHandler class to the main scene
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

/// ////////// DRAFTS ////////////////////

/// /////////// make character conversation ////////////
let activeCharacter = '';
const characterConversation = new Dialog(refs.dialog);
characterConversation.setOnComplete(() => {
  console.log(`conversation with ${activeCharacter} is complete!`); // for test
  events.emit(CONVERSATION_END, activeCharacter);
});
events.on(CONVERSATION_START, 'game', (characterName) => {
  // for test
  console.log('CONVERSATION_START');
  if (activeCharacter !== characterName) activeCharacter = characterName;
  switch (characterName) {
    case 'lida':
      characterConversation.setContent(
        charactersConversationData[characterName].messages,
      );
      characterConversation.setButtons(
        charactersConversationData[characterName].buttons,
      );
      characterConversation.chooseMessage(1);
      break;

    case 'nata1':
      characterConversation.setContent(
        charactersConversationData[characterName].messages,
      );
      characterConversation.setButtons(
        charactersConversationData[characterName].buttons,
      );
      characterConversation.chooseMessage(1);
      break;

    default:
      break;
  }

  characterConversation.open();

  // gameLoop.pause();
}); // for test

events.on(CONVERSATION_END, 'game', () => {
  // gameLoop.start();
}); // for test
// console.log(events);

/// ////////// make action waypoints list (for test) ////////////////////
const lidaPathData = [
  {
    x: 704,
    y: 95,
  },
  {
    x: 912,
    y: 96,
  },
  {
    x: 912,
    y: 144,
  },
  {
    x: 1040,
    y: 144,
  },
  {
    x: 1040,
    y: 96,
  },
  {
    x: 1136,
    y: 96,
  },
  {
    x: 1136,
    y: 320,
  },
  {
    x: 1312,
    y: 320,
  },
  {
    x: 1312,
    y: 751,
  },
  {
    x: 1041,
    y: 752,
  },
  {
    x: 1041,
    y: 240,
  },
  {
    x: 897,
    y: 239,
  },
  {
    x: 897,
    y: 144,
  },
  {
    x: 768,
    y: 144,
  },
  {
    x: 768,
    y: 255,
  },
  {
    x: 848,
    y: 256,
  },
  {
    x: 848,
    y: 319,
  },
  {
    x: 736,
    y: 319,
  },
  {
    x: 736,
    y: 128,
  },
  {
    x: 704,
    y: 128,
  },
  {
    x: 704,
    y: 95,
  },
];
const makeActionsWaypointsList = (pathData) => {
  const actionWaypointsList = [];

  for (let i = 0; i < lidaPathData.length; i += 1) {
    if (i !== 0) {
      const prevCoord = lidaPathData[i - 1];
      const currCoord = lidaPathData[i];
      const distanceToTravelX = currCoord.x - prevCoord.x;
      const distanceToTravelY = currCoord.y - prevCoord.y;

      const distance = Math.sqrt(
        distanceToTravelX ** 2 + distanceToTravelY ** 2,
      );
      actionWaypointsList.push(Math.round(distance));
    }
  }

  return actionWaypointsList;
};

console.log(makeActionsWaypointsList(lidaPathData));
