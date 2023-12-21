import { RevealingText } from './RevealingText';

const DEFAULT_DIALOG_CLOSE_BUTTON = {
  key: 'close',
  content: 'close',
};

class Dialog {
  constructor({
    container = document.querySelector('body'),
    text = '',
    buttons = [
      {
        key: DEFAULT_DIALOG_CLOSE_BUTTON.key,
        content: DEFAULT_DIALOG_CLOSE_BUTTON.content,
        onClick: () => this.close(),
      },
    ],
    onComplete = () => {},
  }) {
    this.container = container;
    this.text = text;
    this.onComplete = onComplete;
    this.root = null;
    this.buttonsData = buttons;
    this.buttonsRefs = [];

    this.opened = false;
  }

  set isOpen(value) {
    this.opened = value;
  }

  get isOpen() {
    return this.opened;
  }

  makeButtonsEls() {
    const buttonElements = [];

    this.buttonsData.forEach(({ key, content }) => {
      if (!key || String(key).trim().length < 1) {
        throw new Error('add unique key attribute to each button');
      }

      const buttonEl = document.createElement('button');
      buttonEl.setAttribute('type', 'button');
      buttonEl.setAttribute('data-key', key);
      buttonEl.setAttribute('data-name', 'dialogButton');

      if (content) buttonEl.innerHTML = content;

      buttonElements.push(buttonEl);
    });

    return buttonElements;
  }

  addActionToButtons() {
    this.buttonsRefs = this.container.querySelectorAll(
      '[data-name = "dialogButton"]',
    );

    this.buttonsRefs.forEach((buttonEl) => {
      this.buttonsData.forEach((buttonData) => {
        if (buttonEl.dataset.key === buttonData.key) {
          buttonEl.addEventListener('click', buttonData.onClick.bind(this));
        }
      });
    });
  }

  removeActionFromButtons() {
    this.buttonsRefs = [];

    this.buttonsRefs.forEach((buttonEl) => {
      this.buttonsData.forEach((buttonData) => {
        if (buttonEl.dataset.key === buttonData.key) {
          buttonEl.removeEventListener('click', buttonData.onClick.bind(this));
        }
      });
    });
  }

  create() {
    // Create the elements
    this.root = document.createElement('div');
    this.root.classList.add('message');

    const textEl = document.createElement('p');
    textEl.classList.add('message_text');

    this.root.append(textEl);

    const buttonsWrapEl = document.createElement('div');
    buttonsWrapEl.setAttribute('data-name', 'buttonsWrap');
    buttonsWrapEl.classList.add('dialog_buttons_wrap');

    this.root.append(buttonsWrapEl);

    const buttonsEls = this.makeButtonsEls();

    buttonsWrapEl.append(...buttonsEls);

    // Init the typewriter effect
    this.revealingText = new RevealingText({
      element: this.root.querySelector('.message_text'),
      text: this.text,
    });
  }

  open() {
    this.create();
    this.container.appendChild(this.root);
    this.addActionToButtons();
    this.revealingText.init();
    this.isOpen = true;
  }

  close() {
    if (this.revealingText.isDone) {
      this.removeActionFromButtons();
      this.root.remove();
      this.onComplete();
    } else {
      this.revealingText.warpToDone();
    }

    this.isOpen = false;
  }
}

// const m = new Dialog({ text: 'some text for test' });
// m.open();
// console.log(m);

export { Dialog };
