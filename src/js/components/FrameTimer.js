class FrameTimer {
  constructor() {
    this.timeTo = 0;
    this.callback = null;
    this.timer = 0;
    this.isStopped = false;
    this.timer2 = 0;
  }

  get timeIsUp() {
    return this.isStopped;
  }

  setTime(time) {
    this.timeTo = time;
  }

  setCallback(callback) {
    this.callback = callback;
    this.callback.bind(this);
  }

  start(deltaTime) {
    deltaTime ??
      console.error('please pass deltaTime argument to start method');

    if (this.timer > this.timeTo) {
      this.timer = 0;
      this.isStopped = true;
      this.callback();
    } else {
      this.timer += Math.round(deltaTime);
    }
  }
}

export { FrameTimer };
