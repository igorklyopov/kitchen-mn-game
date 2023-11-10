/**
 * {
  name: String,
  src: String,
  frameSize: { width: Integer, height: Integer },
  maxNumberOfFramesAlongX: Integer,
  numberOfFramesAlongY: Integer,
  animations: {
    walkUp: {
      frameX:Integer, // x coordinate of beginning frames row (starting from 0)
      frameY:Integer, // y coordinate of beginning frames row (starting from 0)
      frameXNumber:Integer, // frames number in the row of frames
      startFrameIndex:Integer, // frame number in the frame line from which the animation begins (starting from 0)
      fps: Integer,

  },
 */

export const assetsData = [
  { name: 'gameMap', src: '../../assets/img/kitchen_mn_map.png' },
  {
    name: 'hero',
    src: '../../assets/img/hero.png',
    frameSize: { width: 32, height: 32 },
    maxNumberOfFramesAlongX: 3,
    numberOfFramesAlongY: 4,
    animations: {
      walkUp: {
        frameX: 0, // x coordinate of beginning frames row (starting from 0)
        frameY: 3, // y coordinate of beginning frames row (starting from 0)
        frameXNumber: 3, // frames number in the row of frames
        startFrameIndex: 1, // frame number in the frame line from which the animation begins (starting from 0)
        fps: 10,
      },
      walkDown: {
        frameX: 0,
        frameY: 0,
        frameXNumber: 3,
        startFrameIndex: 1,
        fps: 10,
      },
      walkRight: {
        frameX: 0,
        frameY: 2,
        frameXNumber: 3,
        startFrameIndex: 1,
        fps: 10,
      },
      walkLeft: {
        frameX: 0,
        frameY: 1,
        frameXNumber: 3,
        startFrameIndex: 1,
        fps: 10,
      },
      standUp: {
        frameX: 1,
        frameY: 3,
        frameXNumber: 0,
        startFrameIndex: 1,
        fps: 10,
      },
      standDown: {
        frameX: 1,
        frameY: 0,
        frameXNumber: 0,
        startFrameIndex: 1,
        fps: 10,
      },
      standLeft: {
        frameX: 1,
        frameY: 1,
        frameXNumber: 0,
        startFrameIndex: 1,
        fps: 10,
      },
      standRight: {
        frameX: 1,
        frameY: 2,
        frameXNumber: 0,
        startFrameIndex: 1,
        fps: 10,
      },
    },
  },
  {
    name: 'lida',
    src: '../../../assets/img/characters/female/lida.png',
    frameXCount: 3,
    frameYCount: 4,
    fps: 10,
    actions: {
      moveTop: { frameX: 0, frameY: 3, maxFrame: 2 },
      moveBottom: { frameX: 0, frameY: 0 },
      moveRight: { frameX: 0, frameY: 2 },
      moveLeft: { frameX: 0, frameY: 1 },
      standTop: { frameX: 1, frameY: 3 },
      standBottom: { frameX: 1, frameY: 0 },
      standLeft: { frameX: 1, frameY: 1 },
      standRight: { frameX: 1, frameY: 2 },
    },
  },
];
