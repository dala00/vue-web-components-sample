export default class Panel {
  constructor(index, x, y) {
    this.index = index;
    this.backgroundLeft = -75 * (index % 4);
    this.backgroundTop = -75 * Math.floor(index / 4);
    this.x = x;
    this.y = y;
  }
}