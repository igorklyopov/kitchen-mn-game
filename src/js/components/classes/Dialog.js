let dialogInstance = null;

class Dialog {
  #rootElRef;
  #contentContainerEl = null;
  #buttonsData;
  #buttonsWrapEl = null;
  #opened = false;

  constructor({ rootElRef = null }) {
    /**
     * make Singleton
     */
    if (dialogInstance) return dialogInstance;
    dialogInstance = this;
    /** */

    this.#rootElRef = rootElRef;
    this.#create();
    this.buttonsRefs = [];
  }

  #makeOverlayEl() {
    const overlayEl = document.createElement('div');
    overlayEl.classList.add('dialog_overlay');

    return overlayEl;
  }

  #makeContentContainerEl() {
    const contentContainerEl = document.createElement('div');
    contentContainerEl.classList.add('dialog_content_wrap');
    this.#contentContainerEl = contentContainerEl;

    return contentContainerEl;
  }

  #makeButtonsEls(buttonsData = []) {
    const buttonElements = [];

    buttonsData.forEach(({ key, content }) => {
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

  #create() {
    this.#rootElRef.classList.add('dialog');
    this.#rootElRef.classList.add('is_hidden');

    const overlayEl = this.#makeOverlayEl();
    const contentEl = this.#makeContentContainerEl();

    overlayEl.append(contentEl);

    const buttonsWrapEl = document.createElement('div');
    buttonsWrapEl.setAttribute('data-name', 'buttonsWrap');
    buttonsWrapEl.classList.add('dialog_buttons_wrap');
    this.#buttonsWrapEl = buttonsWrapEl;

    const dialogElements = [overlayEl, buttonsWrapEl];

    this.#rootElRef.append(...dialogElements);
  }

  addContent(contentHtml = '') {
    this.#contentContainerEl.innerHTML = contentHtml;
  }

  addButtons(buttonsData = []) {
    const buttonsEls = this.#makeButtonsEls(buttonsData);
    this.#buttonsWrapEl.innerHTML = '';
    this.#buttonsWrapEl.append(...buttonsEls);
    this.#buttonsData = buttonsData;
    this.buttonsRefs =
      this.#rootElRef.querySelectorAll('[data-name = "dialogButton"]') || [];

    this.#addActionToButtons();
  }

  #addActionToButtons() {
    this.buttonsRefs.forEach((buttonEl) => {
      this.#buttonsData.forEach((buttonData) => {
        if (buttonEl.dataset.key === buttonData.key) {
          buttonEl.addEventListener('click', buttonData.onClick.bind(this));
        }
      });
    });
  }

  #removeButtonActions() {
    this.buttonsRefs.forEach((buttonEl) => {
      this.#buttonsData.forEach((buttonData) => {
        if (buttonEl.dataset.action === buttonData.action) {
          buttonEl.removeEventListener('click', buttonData.onClick);
        }
      });
    });
  }

  set isOpen(value) {
    this.#opened = value;
  }

  get isOpen() {
    return this.#opened;
  }

  open() {
    this.#rootElRef.classList.remove('is_hidden');
    this.isOpen = true;
  }

  close() {
    this.#rootElRef.classList.add('is_hidden');
    this.isOpen = false;
    this.#removeButtonActions();
  }
}

export { Dialog };
