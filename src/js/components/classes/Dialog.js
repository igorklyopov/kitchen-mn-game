let dialogInstance = null;

class Dialog {
  #rootEl;
  #content;
  #contentEl = null;
  #buttonsData;
  #buttonsEls = [];
  #isInit = false;

  constructor() {
    /**
     * make Singleton
     */
    if (dialogInstance) return dialogInstance;
    dialogInstance = this;

    this.buttonsRefs;
  }

  #makeOverlayEl() {
    const overlayEl = document.createElement('div');
    overlayEl.classList.add('dialog_overlay');

    return overlayEl;
  }

  #makeContentEl() {
    const contentEl = document.createElement('div');
    contentEl.classList.add('dialog_content');
    this.#contentEl = contentEl;

    this.addContent(this.#content);

    return contentEl;
  }

  #makeButtonsEls() {
    return this.#buttonsData.map((buttonData) => {
      const buttonEl = document.createElement('button');

      buttonEl.setAttribute('type', 'button');
      buttonEl.setAttribute('data-name', 'dialogButton');
      buttonEl.setAttribute('data-id', buttonData.id);
      buttonEl.classList.add('button');
      buttonEl.classList.add('dialog_button');
      buttonEl.innerHTML = buttonData.text;

      return buttonEl;
    });
  }

  create({
    rootEl = null,
    content = '',
    buttons = [{ text: '', id: '', onClick: () => {} }],
  }) {
    this.#rootEl = rootEl;
    this.#content = content;
    this.#buttonsData = buttons;

    this.#isInit = document.querySelector('[data-name = "dialogRootEl"]');

    if (this.#isInit) {
      const buttonsWrapRef = this.#rootEl.querySelector(
        '[data-name = "buttonsWrap"]'
      );

      if (this.buttonsRefs?.length === this.#buttonsData.length) {
        const isEqualButtons = () => {
          const result = [];

          for (const buttonRef of this.buttonsRefs) {
            for (const buttonData of this.#buttonsData) {
              const isEqual =
                buttonRef.dataset.id === buttonData.id &&
                buttonRef.innerText === buttonData.text;

              result.push(isEqual);
            }
          }

          if (result.includes(false)) {
            return false;
          } else {
            return true;
          }
        };

        if (!isEqualButtons()) {
          this.#buttonsEls = this.#makeButtonsEls();
          buttonsWrapRef.innerHTML = '';
          buttonsWrapRef.append(...this.#buttonsEls);
        }
      }
    } else {
      this.#rootEl.setAttribute('data-name', 'dialogRootEl');
      this.#rootEl.classList.add('dialog');
      this.#rootEl.classList.add('is_hidden');

      const overlayEl = this.#makeOverlayEl();
      const contentEl = this.#makeContentEl();

      overlayEl.append(contentEl);

      const buttonsWrapEl = document.createElement('div');
      buttonsWrapEl.setAttribute('data-name', 'buttonsWrap');
      buttonsWrapEl.classList.add('dialog_buttons_wrap');

      this.#buttonsEls = this.#makeButtonsEls();

      buttonsWrapEl.append(...this.#buttonsEls);

      const dialogElements = [overlayEl, buttonsWrapEl];

      this.#rootEl.append(...dialogElements);
    }

    this.buttonsRefs = this.#rootEl.querySelectorAll(
      '[data-name = "dialogButton"]'
    );

    this.#addActionToButtons();
  }

  addContent(contentHtml = '') {
    this.#contentEl.innerHTML = contentHtml;
  }

  #addActionToButtons() {
    this.buttonsRefs.forEach((buttonEl) => {
      this.#buttonsData.forEach((buttonData) => {
        if (buttonEl.dataset.id === buttonData.id) {
          buttonEl.addEventListener('click', buttonData.onClick);
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

  open() {
    this.#rootEl.classList.remove('is_hidden');
  }

  close() {
    this.#rootEl.classList.add('is_hidden');

    this.#removeButtonActions();
  }
}

export { Dialog };
