import { GameObject } from './GameObject.js';
import { Vector2 } from './Vector2.js';
import { Sprite } from './Sprite.js';
import { events } from './Events.js';
import { FrameTimer } from './FrameTimer.js';
import {
  DIRECTIONS_NAMES,
  ACTIONS_NAMES,
  MOVEMENT_STEPS_NUMBER,
  MOVING_STEP_SIZE,
  EVENTS_NAMES,
} from '../data/constants.js';
import { gameMap } from '../helpers/collisionBoundaries.js';
import { isRectanglesCollide } from '../utils/isRectanglesCollide .js';
import { collisionMainData } from '../data/collisions/collisionMain.js';

const { UP, DOWN, LEFT, RIGHT } = DIRECTIONS_NAMES;
const { STAND, WALK, SHOOT } = ACTIONS_NAMES;
const { HERO_POSITION, CONVERSATION_START } = EVENTS_NAMES;
const { tileSize } = collisionMainData;

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
    this.movementStepsNumber = MOVEMENT_STEPS_NUMBER; // the number of steps  the character moves at one time (speed)
    this.movingStepSize = MOVING_STEP_SIZE; // the size of step (distance) the character moves at one time
    this.isSpaceInFrontFree = true;
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
        HERO_POSITION,
        this,
        (heroPosition) => (this.heroPosition = heroPosition),
      );
    }
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
    let currentAction = '';
    let direction = '';

    if (this.isAutoActionPlay) {
      const { generatedAction, generatedDirection } =
        this.generateAction(delta);

      currentAction = this.getCurrentAction(
        generatedAction,
        generatedDirection,
      );
      direction = generatedDirection;
    }

    if (this.isPlayerControlled) {
      const { input } = root;
      const [inputAction] = input.getActions();

      direction = input.getDirection();
      currentAction = this.getCurrentAction(inputAction, direction);

      events.emit(HERO_POSITION, this.position);
    }

    this._saveLastAction(currentAction);
    this._saveCurrentDirection(direction);

    if (currentAction !== STAND) {
      this.move(currentAction, this.currentDirection, delta);
    }

    if (this.isSpaceInFrontFree) {
      this.animateAction(currentAction, this.currentDirection, delta);
    } else {
      this.animateAction(STAND, this.currentDirection, delta);
    }
  }

  setActions(
    actionsData = {
      repeat: false,
      data: [],
    },
  ) {
    this.actions = actionsData;
    this.actions.data = this.getActionsWithWayPoints(actionsData.data);
  }

  getActionsWithWayPoints(data = []) {
    if (data.length < 1) return;

    const actionsWithWayPoints = [];
    let wayPoint = this.position.duplicate();

    for (let i = 0; i < data.length; i += 1) {
      const item = data[i];

      if (item.action === STAND) {
        item.destination = new Vector2({ x: 0, y: 0 });
      }

      if (item.action === WALK) {
        const pathLength = item.distance * this.movingStepSize;

        switch (item.direction) {
          case UP:
            wayPoint = wayPoint.duplicate();
            wayPoint.y -= pathLength;
            item.destination = wayPoint;
            break;

          case DOWN:
            wayPoint = wayPoint.duplicate();
            wayPoint.y += pathLength;
            item.destination = wayPoint;
            break;

          case RIGHT:
            wayPoint = wayPoint.duplicate();
            wayPoint.x += pathLength;
            item.destination = wayPoint;
            break;

          case LEFT:
            wayPoint = wayPoint.duplicate();
            wayPoint.x -= pathLength;
            item.destination = wayPoint;
            break;

          default:
            break;
        }
      }

      actionsWithWayPoints.push(item);
    }

    return actionsWithWayPoints;
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
        case STAND:
          return WALK;

        case WALK:
          return WALK;

        default:
          return '';
      }
    } else if (inputAction === '' && inputDirection === '') {
      // если нет ни направления ни действия - в зависимости от предыдущего действия - идёт на выполнение действие покоя (idle)
      switch (this.lastAction) {
        case '':
          return STAND;

        case WALK:
          return STAND;

        default:
          return '';
      }
    }
  }

  incrementActionDataIndex() {
    if (this.actionDataIndex < this.actions.data.length - 1)
      this.actionDataIndex += 1;
    return this.actionDataIndex;
  }

  resetActionDataIndex() {
    this.actionDataIndex = 0;
    return this.actionDataIndex;
  }

  generateAction(delta = 0) {
    const { data, repeat } = this.actions;
    const timeToNextAction = data[this.actionDataIndex]?.time;
    const destination = data[this.actionDataIndex]?.destination;
    const isArrivedToDestinationPosition =
      this.position.x === destination?.x && this.position.y === destination?.y;

    let generatedAction = data[this.actionDataIndex]?.action;
    let generatedDirection = data[this.actionDataIndex]?.direction;

    if (generatedAction === STAND) {
      if (timeToNextAction) {
        this.frameTimer.setTime(timeToNextAction);
        this.frameTimer.setCallback(() => this.incrementActionDataIndex());
        this.frameTimer.start(delta);
      }
    }

    if (generatedAction === WALK && isArrivedToDestinationPosition) {
      this.incrementActionDataIndex();

      if (this.actionDataIndex < this.actions.data.length) {
        generatedAction = '';
        generatedDirection = '';
      }
    }

    if (
      this.actionDataIndex === this.actions.data.length - 1 &&
      repeat &&
      isArrivedToDestinationPosition
    ) {
      this.resetActionDataIndex();
    }

    return { generatedAction, generatedDirection };
  }

  animateAction(action = '', direction = '', delta = 0) {
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
  checkIsSpaceFree(nextX = 0, nextY = 0) {
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
        // const collisionObjectType = Object.keys(gameMap[i]);

        collisionObjectProps = {
          position: { x: coordinates[0][0], y: coordinates[0][1] },
          width: tileSize,
          height: tileSize,
        };

        if (isRectanglesCollide(thisProps, collisionObjectProps)) {
          // console.log(collisionObjectType);

          if (this.isSpaceInFrontFree) this.isSpaceInFrontFree = false;
          break;
        } else {
          if (!this.isSpaceInFrontFree) this.isSpaceInFrontFree = true;
        }
      }
    } else {
      collisionObjectProps = {
        position: { x: this.heroPosition.x, y: this.heroPosition.y },
        width: this.body.size.width,
        height: this.body.size.height,
      };

      if (isRectanglesCollide(thisProps, collisionObjectProps)) {
        if (this.isSpaceInFrontFree) {
          this.isSpaceInFrontFree = false;
          events.emit(CONVERSATION_START, this.name);
        }
      } else {
        if (!this.isSpaceInFrontFree) this.isSpaceInFrontFree = true;
      }
    }
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

      this.checkIsSpaceFree(nextX, nextY);

      if (this.isSpaceInFrontFree) {
        this.position.x = nextX;
        this.position.y = nextY;
      }
    }
  }
}

export { Character };
