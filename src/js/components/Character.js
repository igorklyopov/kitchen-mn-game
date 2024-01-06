import { GameObject } from './GameObject.js';
import { Vector2 } from './Vector2.js';
import { Sprite } from './Sprite.js';
import { events } from './Events.js';
import { FrameTimer } from './FrameTimer.js';
import { Dialog } from './Message/Dialog.js';
import {
  DIRECTIONS_NAMES,
  ACTIONS_NAMES,
  MOVEMENT_STEPS_NUMBER,
  MOVING_STEP_SIZE,
} from '../data/constants.js';
import { gameMap } from '../helpers/collisionBoundaries.js';
import { isRectanglesCollide } from '../utils/isRectanglesCollide .js';
import { collisionMainData } from '../data/collisions/collisionMain.js';

const { UP, DOWN, LEFT, RIGHT } = DIRECTIONS_NAMES;
const { STAND, WALK, SHOOT } = ACTIONS_NAMES;
const { tileSize } = collisionMainData;

// const standActionsList = new Set([
//   STAND_UP,
//   STAND_DOWN,
//   STAND_LEFT,
//   STAND_RIGHT,
// ]);
// const walkActionsList = new Set([WALK_UP, WALK_DOWN, WALK_LEFT, WALK_RIGHT]);

class Character extends GameObject {
  constructor({
    name = 'character',
    position = { x: 0, y: 0 },
    isPlayerControlled = false,

    // sprite options
    imageSrc,
    frameX,
    frameY,
    frameSize,
    frameXMaxNumber,
    frameYNumber,
    animations,
    scale,
  }) {
    super({
      name,
      position: new Vector2({ x: position.x, y: position.y }),
    });

    this.body = new Sprite({
      imageSrc,
      frameX,
      frameY,
      frameSize,
      frameXMaxNumber,
      frameYNumber,
      animations,
      scale,
      position: this.position,
      name: this.name,
    });
    this.addChild(this.body);

    this.isPlayerControlled = isPlayerControlled; // flag for character role
    this.destinationPosition = this.position.duplicate();
    this.movementStepsNumber = MOVEMENT_STEPS_NUMBER; // the number of steps  the character moves at one time (speed)
    this.movingStepSize = MOVING_STEP_SIZE; // the size of step (distance) the character moves at one time
    this.canMove = true;
    this.isAutoActionPlay = false;
    this.actions = {
      repeat: false,
      data: [],
    };
    this.actionDataIndex = 0;
    this.frameTimer = new FrameTimer();
    this.movingStepsCounter = 0;
    this.lastAction = '';
    this.currentAction = '';
    this.currentDirection = '';

    if (!this.isPlayerControlled) {
      this.heroPosition = new Vector2(0, 0);

      events.on(
        'HERO_POSITION',
        this,
        (heroPosition) => (this.heroPosition = heroPosition),
      );

      this.isActive = false;
    }

    this.messageData = {};
    this.conversation = null;
  }

  set movementSteps(stepsNumber) {
    this.movementStepsNumber = stepsNumber;
  }

  get movementSteps() {
    return this.movementStepsNumber;
  }

  set autoActionsPlay(value) {
    this.actions = value;
  }

  get autoActionsPlay() {
    return this.isAutoActionPlay;
  }

  step(delta, root) {
    const { input } = root;

    const [inputAction] = input.getActions();
    const direction = input.getDirection();
    const currentAction = this.isAutoActionPlay
      ? this.generateAction(delta)
      : this.getCurrentAction(inputAction, direction);

    // console.log(
    //   'currentAction',
    //   currentAction,
    //   'lastAction',
    //   this.lastAction,
    //   'direction',
    //   direction,
    //   'canMove',
    //   this.canMove,
    // );

    if (this.isPlayerControlled) {
      events.emit('HERO_POSITION', this.position);
    }

    this._saveCurrentDirection(direction);

    if (currentAction !== STAND) {
      this._saveLastAction(currentAction);
      this.move(currentAction, this.currentDirection, delta);
    }

    if (this.canMove) {
      this.animateAction(currentAction, this.currentDirection, delta);
    } else {
      this.animateAction(STAND, this.currentDirection, delta);
    }
  }

  incrementActionDataIndex() {
    if (this.actionDataIndex < this.actions.data.length)
      this.actionDataIndex += 1;
  }

  resetActionDataIndex() {
    this.actionDataIndex = 0;
  }

  setActions(actionsData) {
    this.actions = actionsData;
  }

  generateAction(delta) {
    // if (this.isMoving) return;

    const { data } = this.actions;
    const currentAction = data[this.actionDataIndex].action;
    // const currentDistance = data[this.actionDataIndex].distance;
    const timeToNextAction = data[this.actionDataIndex].time;
    // const isWayForwardPaved = this.checkWayForwardIsPaved();

    // const isArrived =
    //   this.destinationPosition.x === this.position.x &&
    //   this.destinationPosition.y === this.position.y;

    if (timeToNextAction) {
      this.frameTimer.setTime(timeToNextAction);
      this.frameTimer.setCallback(() => this.incrementActionDataIndex());
      this.frameTimer.start(delta);
    }
    // else if (standActionsList.has(currentAction)) {
    //   this.incrementActionDataIndex();
    // }

    // if (walkActionsList.has(currentAction) && isArrived && isWayForwardPaved) {
    //   if (currentDistance && this.movingStepsCounter < currentDistance) {
    //     this.movingStepsCounter += 1;
    //   }

    //   if (this.movingStepsCounter === currentDistance) {
    //     this.movingStepsCounter = 0;
    //     this.incrementActionDataIndex();
    //   }
    // }

    const isEndOfAutoActionsList =
      this.actionDataIndex === this.actions.data.length;

    if (this.actions.repeat && isEndOfAutoActionsList) {
      this.resetActionDataIndex();
    }

    return currentAction;
  }

  animateAction(action = '', direction = '', delta) {
    if (action === STAND) {
      switch (direction) {
        case UP:
          this.body.playAnimation({ animationName: 'standUp' });
          return;

        case DOWN:
          this.body.playAnimation({ animationName: 'standDown' });
          return;

        case RIGHT:
          this.body.playAnimation({ animationName: 'standRight' });
          return;

        case LEFT:
          this.body.playAnimation({ animationName: 'standLeft' });
          return;

        default:
          return;
      }
    }

    if (action === WALK) {
      switch (direction) {
        case UP:
          this.body.playAnimation({
            animationName: 'walkUp',
            deltaTime: delta,
          });
          return;

        case DOWN:
          this.body.playAnimation({
            animationName: 'walkDown',
            deltaTime: delta,
          });
          return;

        case RIGHT:
          this.body.playAnimation({
            animationName: 'walkRight',
            deltaTime: delta,
          });
          return;

        case LEFT:
          this.body.playAnimation({
            animationName: 'walkLeft',
            deltaTime: delta,
          });
          break;

        default:
          return;
      }
    }

    // for test
    if (action === SHOOT) {
      switch (direction) {
        case UP:
          console.warn('shoot up');
          return;

        case DOWN:
          console.warn('shoot down');
          return;

        case RIGHT:
          console.warn('shoot right');
          return;

        case LEFT:
          console.warn('shoot left');
          break;

        default:
          break;
      }
    }
  }

  // Validating that the next destination is free
  checkIsSpaceFree(nextX, nextY) {
    const thisProps = {
      position: { x: nextX, y: nextY },
      width: this.body.size.width,
      height: this.body.size.height,
    };

    let collisionObjectProps = {
      position: { x: 0, y: 0 },
      width: 0,
      height: 0,
    };

    if (this.isPlayerControlled) {
      for (let i = 0; i < gameMap.length; i += 1) {
        const coordinates = Object.values(gameMap[i]);
        const collisionObjectProps = {
          position: { x: coordinates[0][0], y: coordinates[0][1] },
          width: tileSize,
          height: tileSize,
        };

        if (isRectanglesCollide(thisProps, collisionObjectProps)) {
          this.canMove = false;
          break;
        } else {
          this.canMove = true;
        }
      }
    } else {
      collisionObjectProps = {
        position: { x: this.heroPosition.x, y: this.heroPosition.y },
        width: this.body.size.width,
        height: this.body.size.height,
      };

      if (isRectanglesCollide(thisProps, collisionObjectProps)) {
        this.canMove = false;
        // if (!this.isMoving) this.showMessage();
      } else {
        this.canMove = true;
      }
    }

    return this.canMove;
  }

  setMessage(
    messageData = {
      text: '',
      buttons: [{ key: '', content: null, onClick: () => {} }],
    },
  ) {
    this.messageData = messageData;
  }

  showMessage() {
    this.conversation = new Dialog({
      container: document.querySelector('.js_game'),
      text: this.messageData.text,
      buttons: this.messageData.buttons,
      onComplete: () => {
        console.log('onComplete');
      },
    });
    this.conversation.open();
    events.emit('INTERACTION_START', this.name);
  }

  move(moveAction = '', direction = '') {
    for (
      let stepsCounter = 0;
      stepsCounter < this.movementStepsNumber;
      stepsCounter += 1
    ) {
      let nextX = this.position.x;
      let nextY = this.position.y;

      if (moveAction === WALK) {
        switch (direction) {
          case UP:
            nextY -= this.movingStepSize;
            break;

          case DOWN:
            nextY += this.movingStepSize;
            break;

          case RIGHT:
            nextX += this.movingStepSize;
            break;

          case LEFT:
            nextX -= this.movingStepSize;
            break;

          default:
            break;
        }
      }

      const isSpaceFree = this.checkIsSpaceFree(nextX, nextY);

      if (isSpaceFree) {
        this.position.x = nextX;
        this.position.y = nextY;
      }
    }
  }

  _saveLastAction(action = '') {
    if (action !== '' && this.lastAction !== action) {
      this.lastAction = action;
    }
  }

  _saveCurrentDirection(direction = '') {
    if (direction !== '' && this.currentDirection !== direction) {
      this.currentDirection = direction;
    }
  }

  getCurrentAction(inputAction = '', inputDirection = '') {
    if (inputAction !== '' && inputDirection !== '') {
      // если при нажатии клавиш задаётся действие и направление - оно идёт на дальнейшее выполнение
      return inputAction;
    } else if (inputAction === '' && inputDirection !== '') {
      // если указано только направление, то в зависимости от последнего действия идёт на выполнение дефолтное действие
      switch (this.lastAction) {
        case '':
          return WALK;

        case WALK:
          return WALK;

        default:
          break;
      }
    } else if (inputAction === '' && inputDirection === '') {
      // если нет ни направления ни действия - в зависимости от предыдущего действия - идёт на выполнение действие покоя (idle)
      switch (this.lastAction) {
        case '':
          return STAND;

        case WALK:
          return STAND;

        default:
          break;
      }
    }
  }
}

export { Character };
