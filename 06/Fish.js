export class Fish {
  constructor(timer) {
    this.timer = timer;
  }

  static createNewbornFish() {
    return new Fish(8);
  }

  evolveOneDay(handleNewFishFn) {
    if (this.timer === 0) {
      handleNewFishFn(Fish.createNewbornFish());
    }
    this.timer = (this.timer - 1 + 7) % 7;
    return this;
  }
}
