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
  GAME_GRID_CELL_SIZE,
} from '../data/constants.js';
import { paveWayForward } from '../helpers/paveWayForward.js';
import { gameMap } from '../helpers/collisionBoundaries.js';
import { isRectanglesCollide } from '../utils/isRectanglesCollide .js';

const { UP, DOWN, LEFT, RIGHT } = DIRECTIONS_NAMES;
const { STAND, WALK, SHOOT } = ACTIONS_NAMES;

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
    this.movementStepsNumber = MOVEMENT_STEPS_NUMBER; // the number of squares (grid cells, tiles of map grid) the character moves at one time
    this.movingStepSize = GAME_GRID_CELL_SIZE; // the size of square (distance) the character moves at one time
    this.isCollide = false;
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
    this.updateMove(delta, root);
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
    if (this.isCollide) return;

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
    // if (!action) {
    //   switch (this.currentDirection) {
    //     case UP:
    //       break;

    //     case DOWN:
    //       break;

    //     case RIGHT:
    //       break;

    //     case LEFT:
    //       break;

    //     default:
    //       break;
    //   }
    // }
    // console.log(action, direction);

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
          break;
      }
    }

    // for test
    if (action === SHOOT) {
      switch (direction) {
        case UP:
          console.log('shoot up');
          return;

        case DOWN:
          console.log('shoot down');
          return;

        case RIGHT:
          console.log('shoot right');
          return;

        case LEFT:
          console.log('shoot left');
          break;

        default:
          break;
      }
    }
  }

  // divides the character`s body into squares equal to the map grid cell and turns their coordinates into map grid cell numbers along the x- and y-axis (for checking on the map whether the space is free)
  normalizeCoordinates(nextX, nextY) {
    const squareX = nextX / this.movingStepSize;
    const squareY = nextY / this.movingStepSize;
    const squaresXNumber = this.body.size.width / this.movingStepSize;
    const squaresYNumber = this.body.size.height / this.movingStepSize;

    const squares = [];

    for (let x = 0; x < squaresXNumber; x += 1) {
      let square;

      for (let y = 0; y < squaresYNumber; y += 1) {
        square = `${squareX + y},${squareY + x}`;

        squares.push(square);
      }
    }

    return squares;
  }

  // Validating that the next destination is free
  checkIsSpaceFree(nextX, nextY) {
    this.isSpaceFree = true;

    if (!this.isPlayerControlled) {
      const isCollideWithHero = isRectanglesCollide(
        {
          position: { x: this.position.x, y: this.position.y },
          width: this.body.size.width,
          height: this.body.size.height,
        },
        {
          position: { x: this.heroPosition.x, y: this.heroPosition.y },
          width: this.body.size.width,
          height: this.body.size.height,
        },
      );

      if (isCollideWithHero) {
        this.isSpaceFree = false;
        if (!this.isCollide) this.showMessage();

        return;
      }
    }

    const coordinatesList = this.normalizeCoordinates(nextX, nextY);

    for (const coordinate of coordinatesList) {
      if (gameMap.has(coordinate)) {
        this.isSpaceFree = false;
        break;
      }
    }

    return this.isSpaceFree;
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
    // for (
    //   let stepsCounter = 0;
    //   stepsCounter < this.movementStepsNumber;
    //   stepsCounter += 1
    // ) {
    //   let nextX = this.destinationPosition.x;
    //   let nextY = this.destinationPosition.y;
    //   switch (moveAction) {
    //     case WALK && direction === DOWN:
    //       nextY += this.movingStepSize;
    //       break;
    //     case WALK && direction === UP:
    //       nextY -= this.movingStepSize;
    //       break;
    //     case WALK && direction === LEFT:
    //       nextX -= this.movingStepSize;
    //       break;
    //     case WALK && direction === RIGHT:
    //       nextX += this.movingStepSize;
    //       break;
    //     default:
    //       break;
    //   }
    //   const isSpaceFree = this.checkIsSpaceFree(nextX, nextY);
    //   if (isSpaceFree) {
    //     this.isCollide = false;
    //     this.destinationPosition.x = nextX;
    //     this.destinationPosition.y = nextY;
    //   } else {
    //     this.isCollide = true;
    //   }
    // }
  }

  checkWayForwardIsPaved() {
    const distance = paveWayForward(
      this,
      this.destinationPosition,
      this.movementStepsNumber,
    );

    return distance <= 1;
  }

  _saveLastAction(action = '') {
    if (action && this.lastAction !== action) {
      this.lastAction = action;
    }
  }

  _saveCurrentDirection(direction = '') {
    if (direction !== '' && this.currentDirection !== direction) {
      this.currentDirection = direction;
    }
  }

  getCurrentAction(inputAction = '', inputDirection = '') {
    if (inputAction && inputDirection) {
      // если при нажатии клавиш задаётся действие и направление - оно идёт на дальнейшее выполнение
      this.currentAction = inputAction;
    } else if (!inputAction && inputDirection) {
      // если указано только направление, то в зависимости от последнего действия идёт на выполнение дефолтное действие
      switch (this.lastAction) {
        case STAND:
          this.currentAction = WALK;
          break;

        default:
          break;
      }
    } else if (!inputAction && !inputDirection) {
      // если нет ни направления ни действия - в зависимости от предыдущего действия - идёт на выполнение действие покоя (idle)
      switch (this.lastAction) {
        case '':
          this.currentAction = STAND;
          break;

        case WALK:
          this.currentAction = STAND;
          break;

        default:
          break;
      }
    }

    return this.currentAction;
  }

  updateMove(delta, root) {
    const { input } = root;

    const isWayForwardPaved = this.checkWayForwardIsPaved();
    // let action = '';
    const [inputAction] = input.getActions();
    const direction = input.getDirection();
    const currentAction = this.getCurrentAction(inputAction, direction);

    this._saveLastAction(currentAction);
    this._saveCurrentDirection(direction);

    // if (this.isAutoActionPlay) {
    //   action = this.generateAction(delta);
    // } else if (this.isPlayerControlled) {

    events.emit('HERO_POSITION', this.position);
    // }

    if (isWayForwardPaved) {
      this.move(this.currentAction, this.currentDirection);

      // const actionForAnimation = this.isCollide
      //   ? this.getStopAction(direction, action)
      //   : action;

      this.animateAction(currentAction, this.currentDirection, delta);
    }
  }

  // getStopAction(moveAction = '', direction='', delta) {
  //   switch (moveAction) {
  //     case WALK_LEFT:
  //       return STAND_LEFT;

  //     case WALK_RIGHT:
  //       return STAND_RIGHT;

  //     case WALK_UP:
  //       return STAND_UP;

  //     case WALK_DOWN:
  //       return STAND_DOWN;

  //     default:
  //       return moveAction;
  //   }
  // }
}

export { Character };
