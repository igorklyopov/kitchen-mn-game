import { ACTIONS_NAMES, HERO_ACTIONS, MOVING_STEP } from '../../data/constants';
import { checkRectangleCollision } from '../../utils/checkRectangleCollision';
// import { Dialog } from '../classes/Dialog';
import { charactersDialogSettings } from '../../data/characters/charactersDialogSettings';
// import { refs } from '../../data/refs';

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
        [ACTIONS_NAMES.moveTop]: false,
        [ACTIONS_NAMES.moveBottom]: false,
        [ACTIONS_NAMES.moveLeft]: false,
        [ACTIONS_NAMES.moveRight]: false,
      },
      characters: {
        prevActiveId: '',
        curActiveId: '',
      },
    };
    // this.dialog = new Dialog({ rootElRef: refs.dialog });
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
      case ACTIONS_NAMES.moveTop:
        this.state.hero.currentAction = ACTIONS_NAMES.standTop;
        break;

      case ACTIONS_NAMES.moveBottom:
        this.state.hero.currentAction = ACTIONS_NAMES.standBottom;
        break;

      case ACTIONS_NAMES.moveLeft:
        this.state.hero.currentAction = ACTIONS_NAMES.standLeft;
        break;

      case ACTIONS_NAMES.moveRight:
        this.state.hero.currentAction = ACTIONS_NAMES.standRight;
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
      this.state.hero.moveTop &&
      this.state.hero.prevAction === ACTIONS_NAMES.moveTop
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
      this.state.hero.moveLeft &&
      this.state.hero.prevAction === ACTIONS_NAMES.moveLeft
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
      this.state.hero.moveBottom &&
      this.state.hero.prevAction === ACTIONS_NAMES.moveBottom
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
      this.state.hero.moveRight &&
      this.state.hero.prevAction === ACTIONS_NAMES.moveRight
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
      character.update(this.state, deltaTime),
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

      if (
        this.state.characters.curActiveId !== '' &&
        this.state.characters.curActiveId !== this.state.characters.prevActiveId
      ) {
        this.state.characters.prevActiveId = this.state.characters.curActiveId;

        for (const dialogData of charactersDialogSettings) {
          if (dialogData.name === this.state.characters.curActiveId) {
            // this.dialog.addContent('lida message');
            // this.dialog.addButtons(dialogData.buttons);
            // this.dialog.open();

            break;
          }
        }
      }
    };

    animationLoop(0);
  }
}

export { Game };
