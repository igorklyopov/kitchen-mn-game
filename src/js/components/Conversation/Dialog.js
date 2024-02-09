import { RevealingText } from './RevealingText';

const DEFAULT_DIALOG_CLOSE_BUTTON = {
  key: 'close',
  content: 'close',
  attributes: [],
  classNames: [],
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
    this._messages = [];
    this._currentMessageId = 0;
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

  get refs() {
    return this._refs;
  }

  set isOpen(value) {
    this._opened = value;
  }

  get isOpen() {
    return this._opened;
  }

  _makeButtonsEls(buttonsData = []) {
    return buttonsData.map(
      ({ key, content, onClick, attributes, classNames }) => {
        if (!key || String(key).trim().length < 1) {
          throw new Error('add unique key attribute to each button');
        }

        const buttonEl = document.createElement('button');
        buttonEl.setAttribute('type', 'button');
        buttonEl.setAttribute('data-key', key);
        buttonEl.setAttribute('data-name', 'dialogButton');
        if (attributes && attributes.length > 0) {
          attributes.forEach((attribute) =>
            buttonEl.setAttribute(
              Object.keys(attribute)[0],
              Object.values(attribute)[0],
            ),
          );
        }
        buttonEl.classList.add(this._elementsCommonClassName, 'dialog_button');
        if (classNames && classNames.length > 0) {
          buttonEl.classList.add(...classNames);
        }
        if (content) buttonEl.innerHTML = content;
        buttonEl.addEventListener('click', onClick.bind(this));

        return buttonEl;
      },
    );
  }

  _addButtons() {
    const buttonsWrapRef = this._refs.find(
      (ref) => ref.dataset.name === 'buttonsWrap' ?? ref,
    );

    const buttonsEls = this._makeButtonsEls(this._buttonsData);

    buttonsWrapRef.innerHTML = '';
    buttonsWrapRef.append(...buttonsEls);

    this.buttonsRefs = [...buttonsEls];
    this._refs = [...this._refs, ...this.buttonsRefs];
  }

  setOnComplete(callback = () => {}) {
    this._onComplete = callback;
  }

  setContent(
    content = [
      {
        id: 0,
        text: '',
      },
    ],
  ) {
    this._messages = content;
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

  chooseMessage(messageId = 0) {
    if (this._currentMessageId !== messageId) {
      this._currentMessageId = messageId;
    }

    const currentMessage = this._messages.find(
      (message) => message.id === this._currentMessageId,
    );

    if (this._text !== currentMessage.text) {
      this._revealingText.stop();
      this._text = currentMessage.text;
      this._revealingText.setText(currentMessage.text);
      this._revealingText.init();
    }
  }

  open() {
    if (!this._root || this.isOpen) return;
    if (this._text.trim() === '') {
      console.warn(
        'There is no content in the dialog you want to open. Try using chooseMessage(messageId) method to display the corresponding message',
      );
      return;
    }

    this.isOpen = true;
    this._root.classList.add('is_open');
  }

  close() {
    this._revealingText.stop();
    this._root.classList.remove('is_open');
    this.isOpen = false;
    this._onComplete();
    this.removeText();
    this.removeButtons();
  }

  removeButtons() {
    const buttonsWrapRef = this._refs.find(
      (ref) => ref.dataset.name === 'buttonsWrap' ?? ref,
    );

    if (buttonsWrapRef.innerHTML !== '') buttonsWrapRef.innerHTML = '';

    this.buttonsRefs = [DEFAULT_DIALOG_CLOSE_BUTTON];
    this._refs = this._refs.filter(
      (ref) => ref.dataset.name !== 'dialogButton',
    );
  }

  removeText() {
    const textRef = this._refs.find(
      (ref) => ref.dataset.name === 'text' ?? ref,
    );

    if (textRef.innerHTML !== '') textRef.innerHTML = '';

    this._text = '';
  }
}

export { Dialog };
