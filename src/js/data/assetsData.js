export const assetsData = [
  { name: 'gameMap', src: '../../public/assets/img/kitchen_mn_map.png' },
  {
    name: 'hero',
    src: '../../public/assets/img/hero.png',
    frameXCount: 3,
    frameYCount: 4,
    fps: 10,
    actions: {
      move_top: { frameX: 0, frameY: 3, maxFrame: 2 },
      move_bottom: { frameX: 0, frameY: 0, maxFrame: 2 },
      move_right: { frameX: 0, frameY: 2, maxFrame: 2 },
      move_left: { frameX: 0, frameY: 1, maxFrame: 2 },
      stand_top: { frameX: 1, frameY: 3, maxFrame: 2 },
      stand_bottom: { frameX: 1, frameY: 0, maxFrame: 2 },
      stand_left: { frameX: 1, frameY: 1, maxFrame: 2 },
      stand_right: { frameX: 1, frameY: 2, maxFrame: 2 },
    },
  },
];
