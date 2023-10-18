export class Ship {
  orientation: 'vertical' | 'horizontal'
  length: 2 | 3 | 4 | 5

  constructor(len: 2 | 3 | 4 | 5) {
    this.length = len
  }
}
