import {
  ACTIONS_NAMES,
  HERO_ACTIONS,
  MOVING_STEP,
} from '../../data/constants.js';
import { checkRectangleCollision } from '../../utils/checkRectangleCollision.js';
import { Dialog } from './dialog.js';

// ====== dialog ======>
import { refs } from '../../data/refs.js';

const dialog = new Dialog();

const lidaMessage =
  'Ходят здесь, мусорят - покусаю, ё-моё!!! Почему я за вами должна убирать?! Мне что больше всех надо? Идите на своё рабочее место! Нечего здесь ходить!!!... Вечно придут, наср*т, и не убирают! А я потом получаю! Оце ж и дома такэ!.. Я в следующий раз загорожу всё и ходите через улицу - мне всё равно!!! Что это такое??? Разве можно так?! Нина! Нина-а-а!!! Нина Григорьевна! Только мешают работать и всё! Никакой пользы от них... не нравится - я пойду на овощи! Становитесь и сами работайте здесь! В этом свинюшнике. Что это такое?! Вот что это???  Вы что не знаете где оно должно лежать?!! Как так можно? - не понимаю!.. Как в таких условиях можно работать? А потом - Лида то, Лида сё!.. Убирайте сейчас же!!! И не ходите здесь! Что не понятного??? Сто раз говорила уже!!! Не доходит что-ли? Что за люди...';

const buttons = [
  {
    text: 'дать шоколадку',
    id: 'give_chocolate',
    onClick: () => {
      console.log('дать шоколадку');
      dialog.buttonsRefs.forEach((button) => {
        if (button.dataset.id === 'continue') {
          button.removeAttribute('disabled');
        } else {
          button.setAttribute('disabled', 'true');
        }
      });
    },
  },
  {
    text: 'позвать Богдана',
    id: 'call_bohdan',
    onClick: () => {
      console.log('позвать Богдана');

      dialog.buttonsRefs.forEach((button) => {
        if (button.dataset.id === 'continue') {
          button.removeAttribute('disabled');
        } else {
          button.setAttribute('disabled', 'true');
        }
      });
    },
  },
  {
    text: 'продолжить',
    id: 'continue',
    onClick: () => {
      console.log('продолжить');
      dialog.close();
    },
  },
];

const lidaMessageHtml = `<p>${lidaMessage}</p>`;

dialog.create({
  rootEl: refs.dialog,
  content: lidaMessageHtml,
  buttons,
});
dialog.buttonsRefs.forEach((button) => {
  if (button.dataset.id === 'continue') {
    button.setAttribute('disabled', 'true');
  }
});
// dialog.open();
// dialog.addContent('<p>test</p>');
// dialog.close();

// <====== END dialog ======

class Game {
  constructor({
    canvas = null,
    hero = null,
    characters = [],
    boundaries = [],
    renderables = [],
    movables = [],
  }) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.hero = hero;
    this.characters = characters;
    this.boundaries = boundaries;
    this.renderables = renderables;
    this.movables = movables;
    this.state = {
      background: { moving: true },
      hero: {
        prevAction: '',
        currentAction: '',
        [ACTIONS_NAMES.move_top]: false,
        [ACTIONS_NAMES.move_bottom]: false,
        [ACTIONS_NAMES.move_left]: false,
        [ACTIONS_NAMES.move_right]: false,
      },
    };
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  render() {
    this.renderables.forEach((renderable) => {
      renderable.draw(this.ctx);
    });
  }

  onKeyDown(e) {
    const key = e.code;

    for (let i = 0; i < HERO_ACTIONS.length; i += 1) {
      const action = HERO_ACTIONS[i];

      if (action.keys?.includes(key)) {
        this.state.hero[action.name] = true;
        this.state.hero.prevAction = action.name;
        this.state.hero.currentAction = action.name;

        return;
      }
    }
  }

  setHeroIdleAction(prevAction) {
    switch (prevAction) {
      case ACTIONS_NAMES.move_top:
        this.state.hero.currentAction = ACTIONS_NAMES.stand_top;
        break;

      case ACTIONS_NAMES.move_bottom:
        this.state.hero.currentAction = ACTIONS_NAMES.stand_bottom;
        break;

      case ACTIONS_NAMES.move_left:
        this.state.hero.currentAction = ACTIONS_NAMES.stand_left;
        break;

      case ACTIONS_NAMES.move_right:
        this.state.hero.currentAction = ACTIONS_NAMES.stand_right;
        break;

      default:
        break;
    }
  }

  onKeyUp(e) {
    const key = e.code;

    for (let i = 0; i < HERO_ACTIONS.length; i += 1) {
      const action = HERO_ACTIONS[i];

      if (action.keys?.includes(key)) {
        this.state.hero[action.name] = false;
        this.setHeroIdleAction(this.state.hero.prevAction);

        return;
      }
    }
  }

  move(moving) {
    const rectA = {
      width: this.hero.frameWidth,
      height: this.hero.frameHeight,
      position: this.hero.position,
    };

    if (
      this.state.hero.move_top &&
      this.state.hero.prevAction === ACTIONS_NAMES.move_top
    ) {
      for (let i = 0; i < this.boundaries.length; i += 1) {
        const boundary = this.boundaries[i];
        const isColliding = checkRectangleCollision({
          rectA,
          rectB: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + MOVING_STEP,
            },
          },
        });

        if (isColliding) {
          moving = false;
          this.setHeroIdleAction(this.state.hero.prevAction);
          break;
        }
      }

      for (let i = 0; i < this.characters.length; i += 1) {
        const character = this.characters[i];
        const isColliding = checkRectangleCollision({
          rectA,
          rectB: {
            width: character.frameWidth,
            height: character.frameHeight,
            position: {
              x: character.position.x,
              y: character.position.y + MOVING_STEP,
            },
          },
        });

        if (isColliding) {
          character.isActive = true;

          moving = false;
          this.setHeroIdleAction(this.state.hero.prevAction);
          break;
        }
      }

      if (moving)
        this.movables.forEach((movable) => {
          movable.position.y += MOVING_STEP;
        });
    } else if (
      this.state.hero.move_left &&
      this.state.hero.prevAction === ACTIONS_NAMES.move_left
    ) {
      for (let i = 0; i < this.boundaries.length; i += 1) {
        const boundary = this.boundaries[i];
        const isColliding = checkRectangleCollision({
          rectA,
          rectB: {
            ...boundary,
            position: {
              x: boundary.position.x + MOVING_STEP,
              y: boundary.position.y,
            },
          },
        });

        if (isColliding) {
          moving = false;
          this.setHeroIdleAction(this.state.hero.prevAction);
          break;
        }
      }

      for (let i = 0; i < this.characters.length; i += 1) {
        const character = this.characters[i];
        const isColliding = checkRectangleCollision({
          rectA,
          rectB: {
            width: character.frameWidth,
            height: character.frameHeight,
            position: {
              x: character.position.x + MOVING_STEP,
              y: character.position.y,
            },
          },
        });

        if (isColliding) {
          character.isActive = true;

          moving = false;
          this.setHeroIdleAction(this.state.hero.prevAction);
          break;
        }
      }

      if (moving)
        this.movables.forEach((movable) => {
          movable.position.x += MOVING_STEP;
        });
    } else if (
      this.state.hero.move_bottom &&
      this.state.hero.prevAction === ACTIONS_NAMES.move_bottom
    ) {
      for (let i = 0; i < this.boundaries.length; i += 1) {
        const boundary = this.boundaries[i];
        const isColliding = checkRectangleCollision({
          rectA,
          rectB: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - MOVING_STEP,
            },
          },
        });

        if (isColliding) {
          moving = false;
          this.setHeroIdleAction(this.state.hero.prevAction);
          break;
        }
      }

      for (let i = 0; i < this.characters.length; i += 1) {
        const character = this.characters[i];
        const isColliding = checkRectangleCollision({
          rectA,
          rectB: {
            width: character.frameWidth,
            height: character.frameHeight,
            position: {
              x: character.position.x,
              y: character.position.y - MOVING_STEP,
            },
          },
        });

        if (isColliding) {
          character.isActive = true;

          moving = false;
          this.setHeroIdleAction(this.state.hero.prevAction);
          break;
        }
      }

      if (moving)
        this.movables.forEach((movable) => {
          movable.position.y -= MOVING_STEP;
        });
    } else if (
      this.state.hero.move_right &&
      this.state.hero.prevAction === ACTIONS_NAMES.move_right
    ) {
      for (let i = 0; i < this.boundaries.length; i += 1) {
        const boundary = this.boundaries[i];
        const isColliding = checkRectangleCollision({
          rectA,
          rectB: {
            ...boundary,
            position: {
              x: boundary.position.x - MOVING_STEP,
              y: boundary.position.y,
            },
          },
        });

        if (isColliding) {
          moving = false;
          this.setHeroIdleAction(this.state.hero.prevAction);
          break;
        }
      }

      for (let i = 0; i < this.characters.length; i += 1) {
        const character = this.characters[i];
        const isColliding = checkRectangleCollision({
          rectA,
          rectB: {
            width: character.frameWidth,
            height: character.frameHeight,
            position: {
              x: character.position.x - MOVING_STEP,
              y: character.position.y,
            },
          },
        });

        if (isColliding) {
          character.isActive = true;

          moving = false;
          this.setHeroIdleAction(this.state.hero.prevAction);
          break;
        }
      }

      if (moving)
        this.movables.forEach((movable) => {
          movable.position.x -= MOVING_STEP;
        });
    }
  }

  updateCharacters(deltaTime) {
    this.characters.forEach((character) =>
      character.update(this.state, deltaTime)
    );
  }

  animate() {
    let lastTime = 0;
    const animationLoop = (timeStamp) => {
      const deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;

      const animationId = requestAnimationFrame(animationLoop);

      this.clearCanvas();
      this.render();

      this.move(this.state.background.moving);
      this.hero.makeAction(this.state.hero.currentAction, deltaTime);

      this.updateCharacters(deltaTime);
    };

    animationLoop(0);
  }
}

export { Game };
