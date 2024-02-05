import { REVEALING_TEXT_SPEED_DEFAULT } from '../../data/constants';

class RevealingText {
  constructor(element = null) {
    this.element = element;
    this.text = '';
    this.speed = REVEALING_TEXT_SPEED_DEFAULT;

    this.interval = null;
    this.isDone = false;
  }

  setText(text = '') {
    this.text = text;
  }

  setSpeed(speed = 0) {
    this.speed = speed;
  }

  stop() {
    clearInterval(this.interval);
    this.isDone = true;
  }

  init() {
    let i = 0;
    if (this.element.innerHTML !== '') this.element.innerHTML = '';

    this.isDone = false;

    this.interval = setInterval(() => {
      if (i === this.text.length) {
        this.stop();
      } else {
        this.element.innerHTML += this.text[i];
        i += 1;
      }
    }, this.speed);
  }
}

export { RevealingText };
