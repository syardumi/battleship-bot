import { Ship } from './ship'

export class Board {
  grid: boolean[][]
  ships: Ship[]

  constructor() {
    this.ships = [
      new Ship(5),
      new Ship(4),
      new Ship(3),
      new Ship(3),
      new Ship(2)
    ]
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this.grid[i][j] = false
      }
    }
  }

  public canPlace(coords: { x: number; y: number }[]): boolean {
    return coords.every((coord) => this.grid[coord.x][coord.y] === false)
  }

  public doPlace(coords: { x: number; y: number }[]): void {
    coords.forEach((coord) => {
      this.grid[coord.x][coord.y] = true
    })
  }
}
