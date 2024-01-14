class RevealingText {
  constructor({ element = null, text = '', speed = 80 }) {
    this.element = element;
    this.text = text;
    this.speed = speed;

    this.interval = null;
    this.isDone = false;
  }

  warpToDone() {
    clearInterval(this.interval);
    this.isDone = true;
  }

  init() {
    let i = 0;
    if (this.element.innerHTML !== '') this.element.innerHTML = '';

    this.isDone = false;

    this.interval = setInterval(() => {
      if (i === this.text.length) {
        this.warpToDone();
      } else {
        this.element.innerHTML += this.text[i];
        i += 1;
      }
    }, this.speed);
  }
}

export { RevealingText };
