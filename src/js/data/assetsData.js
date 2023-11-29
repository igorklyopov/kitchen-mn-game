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

const assetsData = [
  { name: 'gameMap', src: '/assets/images/kitchen_mn_map.png' },
  {
    name: 'hero',
    src: '/assets/images/sprites/hero.png',
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
    src: '/assets/images/sprites/characters/female/lida.png',
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
];

export { assetsData };
