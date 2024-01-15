class GameLoop {
  constructor({ update = () => {}, render = () => {}, fps = 30 }) {
    this.update = update;
    this.render = render;
    this.fps = fps; // number frames per second, speed

    this.lastFrameTime = 0;
    this.accumulatedTime = 0;
    this.timeStep = Math.round(1000 / this.fps); // 1000 ms (1 sec)

    this.rafId = null;
    this.isRunning = false;
    this.isPaused = false;
  }

  setFps(newFps = 0) {
    this.fps = newFps;
    this.timeStep = Math.round(1000 / this.fps);
  }

  runUpdate(timeStamp) {
    const deltaTime = Math.round(timeStamp - this.lastFrameTime);
    this.lastFrameTime = Math.round(timeStamp);

    // Accumulate all the time since the last frame.
    this.accumulatedTime = Math.round(this.accumulatedTime + deltaTime);

    // Fixed time step updates.
    // If there's enough accumulated time to run one or more fixed updates, run them.
    while (this.accumulatedTime >= this.timeStep) {
      this.update(this.timeStep); // Here, we pass the fixed time step size.
      this.accumulatedTime -= this.timeStep;
    }
  }

  mainLoop = (timeStamp) => {
    if (!this.isRunning) return;

    if (!this.isPaused) this.runUpdate(timeStamp);

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

  pause() {
    this.isPaused = true;
  }

  stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    this.isRunning = false;
  }
}

export { GameLoop };
