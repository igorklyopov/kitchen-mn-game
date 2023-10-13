import { keys, state } from './data/constants.js';



function onKeyDown(e) {
  const key = e.code;
  

  switch (key) {
    case 'Numpad8':
      keys.Numpad8.pressed = true;
      state.lastKey = 'Numpad8';
      break;

    case 'Numpad4':
      keys.Numpad4.pressed = true;
      state.lastKey = 'Numpad4';
      break;

    case 'Numpad2':
      keys.Numpad2.pressed = true;
      state.lastKey = 'Numpad2';
      break;

    case 'Numpad6':
      keys.Numpad6.pressed = true;
      state.lastKey = 'Numpad6';
      break;
  }
}

function onKeyUp(e) {
  const key = e.code;

  switch (key) {
    case 'Numpad8':
      keys.Numpad8.pressed = false;
      break;

    case 'Numpad4':
      keys.Numpad4.pressed = false;
      break;

    case 'Numpad2':
      keys.Numpad2.pressed = false;
      break;

    case 'Numpad6':
      keys.Numpad6.pressed = false;
      break;

    default:
      break;
  }
}

export { onKeyDown, onKeyUp };
