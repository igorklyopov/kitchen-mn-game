class RevealingText {
  constructor(config) {
    this.element = config.element;
    this.text = config.text;
    this.speed = config.speed || 80;

    this.timeout = null;
    this.isDone = false;
  }

  revealOneSymbol(list) {
    const next = list.splice(0, 1)[0];
    next.span.classList.add('revealed');

    if (list.length > 0) {
      this.timeout = setTimeout(() => {
        this.revealOneSymbol(list);
      }, next.delayAfter);
    } else {
      this.isDone = true;
    }
  }

  warpToDone() {
    clearTimeout(this.timeout);
    this.isDone = true;
    this.element.querySelectorAll('span').forEach((s) => {
      s.classList.add('revealed');
    });
  }

  init() {
    const symbols = [];
    this.text.split('').forEach((symbol) => {
      // Create each span, add to element in DOM
      const span = document.createElement('span');
      span.textContent = symbol;
      this.element.appendChild(span);

      // Add this span to our internal state Array
      symbols.push({
        span,
        delayAfter: symbol === ' ' ? 0 : this.speed,
      });
    });

    this.revealOneSymbol(symbols);
  }
}

export { RevealingText };
