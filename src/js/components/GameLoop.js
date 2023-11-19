import { GAME_LOOP_FPS_DEFAULT } from '../data/constants';

class GameLoop {
  constructor(update, render, fps) {
    this.update = update;
    this.render = render;
    this.fps = fps ?? GAME_LOOP_FPS_DEFAULT; // number frames per second, speed

    this.lastFrameTime = 0;
    this.accumulatedTime = 0;
    this.timeStep = 1000 / this.fps; // 1000 ms, 1 sec

    this.rafId = null;
    this.isRunning = false;
  }

  mainLoop = (timestamp) => {
    if (!this.isRunning) return;

    const deltaTime = timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;

    // Accumulate all the time since the last frame.
    this.accumulatedTime += deltaTime;

    // Fixed time step updates.
    // If there's enough accumulated time to run one or more fixed updates, run them.
    while (this.accumulatedTime >= this.timeStep) {
      this.update(this.timeStep); // Here, we pass the fixed time step size.
      this.accumulatedTime -= this.timeStep;
    }

    // Render
    this.render();

    this.rafId = requestAnimationFrame(this.mainLoop);
  };

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.rafId = requestAnimationFrame(this.mainLoop);
    }
  }

  stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    this.isRunning = false;
  }
}

export { GameLoop };
