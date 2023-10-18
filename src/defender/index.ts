import { Board } from './cmp/board'
import { Ship } from './cmp/ship'

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export class Defender {
  ships = [new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2)]
  board = new Board()

  constructor() {
    for (let i = 0; i < this.ships.length; i++) {
      let x, y
      do {
        this.ships[i].orientation =
          Math.random() < 0.5 ? 'vertical' : 'horizontal'
        x = getRandomInt(0, 9)
        y = getRandomInt(0, 9)
      } while (!this.board.canPlaceShip({ x, y }, this.ships[i]))
      this.board.doPlaceShip({ x, y }, this.ships[i])
    }
  }
}
