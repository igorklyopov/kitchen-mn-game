import { RevealingText } from './RevealingText';

const DEFAULT_DIALOG_CLOSE_BUTTON = {
  key: 'close',
  content: 'close',
};

class Dialog {
  constructor({ container = document.querySelector('body') }) {
    this.container = container;
    this.root = null;
    this.text = '';
    this.buttonsData = [];
    this.buttonsRefs = [];
    this.onComplete = () => {};
    this.opened = false;
  }

  set isOpen(value) {
    this.opened = value;
  }

  get isOpen() {
    return this.opened;
  }

  setOnComplete(callback = () => {}) {
    this.onComplete = callback;
  }

  setConfig({
    text = '',
    buttons = [
      {
        key: DEFAULT_DIALOG_CLOSE_BUTTON.key,
        content: DEFAULT_DIALOG_CLOSE_BUTTON.content,
        onClick: () => this.close(),
      },
    ],
  }) {
    this.text = text;
    this.buttonsData = buttons;

    const isCreated = this.container.querySelector(
      '[data-name = "dialogRoot"]',
    );

    if (isCreated) return;

    this.create();
    this.container.appendChild(this.root);
    this.addActionToButtons();
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
      buttonEl.classList.add('dialog_button');

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
    this.root.setAttribute('data-name', 'dialogRoot');
    this.root.classList.add('dialog');

    const textEl = document.createElement('p');
    textEl.classList.add('dialog_text');

    this.root.append(textEl);

    const buttonsWrapEl = document.createElement('div');
    buttonsWrapEl.setAttribute('data-name', 'buttonsWrap');
    buttonsWrapEl.classList.add('dialog_buttons_wrap');

    this.root.append(buttonsWrapEl);

    const buttonsEls = this.makeButtonsEls();

    buttonsWrapEl.append(...buttonsEls);
  }

  open() {
    if (!this.root) return;

    this.root.classList.add('is_open');
    this.isOpen = true;

    // Init the typewriter effect
    this.revealingText = new RevealingText({
      element: this.root.querySelector('.dialog_text'),
      text: this.text,
    });
    this.revealingText.init();
  }

  close() {
    this.root.classList.remove('is_open');
    this.onComplete();
    this.removeActionFromButtons();
    this.root.remove();
    this.isOpen = false;
  }
}

export { Dialog };
