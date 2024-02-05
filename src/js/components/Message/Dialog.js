import { RevealingText } from './RevealingText';

const DEFAULT_DIALOG_CLOSE_BUTTON = {
  key: 'close',
  content: 'close',
  onClick: function () {
    this.close();
  },
};

let dialogId = 0;

class Dialog {
  constructor(container = document.querySelector('body')) {
    this._container = container;
    this._root = null;
    this._dialogId = dialogId += 1;
    this._text = '';
    this._buttonsData = [DEFAULT_DIALOG_CLOSE_BUTTON];
    this.buttonsRefs = [];
    this._onComplete = () => {};
    this._opened = false;
    this._elementsCommonClassName = 'js_dialog_el';

    this._create();

    this._refs = Array.from(
      this._root.getElementsByClassName(this._elementsCommonClassName),
    );
    this._revealingText = new RevealingText(
      this._refs.find((ref) => ref.dataset.name === 'text' ?? ref),
    );
  }

  set isOpen(value) {
    this._opened = value;
  }

  get isOpen() {
    return this._opened;
  }

  _makeButtonsEls(buttonsData = []) {
    return buttonsData.map(({ key, content, onClick }) => {
      if (!key || String(key).trim().length < 1) {
        throw new Error('add unique key attribute to each button');
      }

      const buttonEl = document.createElement('button');
      buttonEl.setAttribute('type', 'button');
      buttonEl.setAttribute('data-key', key);
      buttonEl.setAttribute('data-name', 'dialogButton');
      buttonEl.classList.add(this._elementsCommonClassName, 'dialog_button');

      if (content) buttonEl.innerHTML = content;
      buttonEl.addEventListener('click', onClick.bind(this));

      return buttonEl;
    });
  }

  _addButtons() {
    const buttonsWrapRef = this._refs.find(
      (ref) => ref.dataset.name === 'buttonsWrap' ?? ref,
    );
    if (buttonsWrapRef.innerHTML !== '') return;

    const buttonsEls = this._makeButtonsEls(this._buttonsData);

    buttonsWrapRef.innerHTML = '';
    buttonsWrapRef.append(...buttonsEls);

    this.buttonsRefs = [...buttonsEls];
    this._refs = [...this._refs, ...this.buttonsRefs];
  }

  setOnComplete(callback = () => {}) {
    this._onComplete = callback;
  }

  setContent(text = '') {
    this._text = text;
    this._revealingText.setText(this._text);
  }

  setButtons(buttons = [DEFAULT_DIALOG_CLOSE_BUTTON]) {
    this._buttonsData = buttons;
    this._addButtons();
  }

  _create() {
    // Create the elements
    this._root = document.createElement('div');
    this._root.setAttribute('data-name', 'dialogRoot');
    this._root.setAttribute('data-id', this._dialogId);
    this._root.classList.add('dialog');

    const textEl = document.createElement('p');
    textEl.setAttribute('data-name', 'text');
    textEl.classList.add(this._elementsCommonClassName, 'dialog_text');

    const buttonsWrapEl = document.createElement('div');
    buttonsWrapEl.setAttribute('data-name', 'buttonsWrap');
    buttonsWrapEl.classList.add(
      this._elementsCommonClassName,
      'dialog_buttons_wrap',
    );

    if (this._text.trim() !== '') {
      this._addButtons();
    }

    this._root.append(textEl, buttonsWrapEl);
    this._container?.appendChild(this._root);
  }

  clear() {
    for (const ref of this._refs) {
      if (ref.dataset.name === 'buttonsWrap' || ref.dataset.name === 'text') {
        ref.innerHTML = '';
      }
    }
    this._text = '';
    this.buttonsRefs = [DEFAULT_DIALOG_CLOSE_BUTTON];
    this._refs = this._refs.filter(
      (ref) => ref.dataset.name !== 'dialogButton',
    );
  }

  open() {
    if (!this._root || this.isOpen) return;
    if (this._text.trim() === '') {
      console.warn('there is no content in the dialog you want to open');
      return;
    }

    this.isOpen = true;
    this._root.classList.add('is_open');
    this._revealingText.init();
  }

  close() {
    this._revealingText.stop();
    this._root.classList.remove('is_open');
    this.isOpen = false;
    this._onComplete();
    this.clear();
  }
}

export { Dialog };
