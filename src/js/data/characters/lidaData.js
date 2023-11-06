import { getCharacterMovePath } from '../../utils/getCharacterMovePath';

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

const lidaPath = getCharacterMovePath(lidaPathData);

export { lidaPath };
