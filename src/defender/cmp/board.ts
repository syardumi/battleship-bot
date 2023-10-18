import { Ship } from './ship'

export class Board {
  shipGrid: boolean[][]
  guessGrid: boolean[][]

  constructor() {
    this.shipGrid = [[], [], [], [], [], [], [], [], [], []]
    this.guessGrid = [[], [], [], [], [], [], [], [], [], []]
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this.shipGrid[i][j] = false
        this.guessGrid[i][j] = false
      }
    }
  }

  public canPlaceShip(
    startCoord: { x: number; y: number },
    ship: Ship
  ): boolean {
    let canPlace = true
    for (let i = 0; i < ship.length; i++) {
      if (ship.orientation === 'horizontal') {
        if (
          startCoord.x + i >= 10 ||
          this.shipGrid[startCoord.x + i][startCoord.y]
        )
          canPlace = false
      } else if (ship.orientation === 'vertical') {
        if (
          startCoord.y + i >= 10 ||
          this.shipGrid[startCoord.x][startCoord.y + i]
        )
          canPlace = false
      }
    }
    return canPlace
  }

  public doPlaceShip(startCoord: { x: number; y: number }, ship: Ship): void {
    for (let i = 0; i < ship.length; i++) {
      if (ship.orientation === 'horizontal') {
        this.shipGrid[startCoord.x + i][startCoord.y] = true
      } else if (ship.orientation === 'vertical') {
        this.shipGrid[startCoord.x][startCoord.y + i] = true
      }
    }
  }

  public canGuess(coord: { x: number; y: number }) {
    return (
      coord.x >= 0 &&
      coord.x < 10 &&
      coord.y >= 0 &&
      coord.y < 10 &&
      !this.guessGrid[coord.x][coord.y]
    )
  }

  public doGuess(coord: { x: number; y: number }) {
    this.guessGrid[coord.x][coord.y] = true
  }

  public isHit(coord: { x: number; y: number }): boolean {
    const { x, y } = coord
    return this.shipGrid[x][y] && this.guessGrid[x][y]
  }

  public allSunk(): boolean {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.shipGrid[i][j] && !this.guessGrid[i][j]) return false
      }
    }
    return true
  }

  public print() {
    console.log('---------------------')
    for (let j = 0; j < 10; j++) {
      let line = '|'
      for (let i = 0; i < 10; i++) {
        if (this.shipGrid[i][j] && !this.guessGrid[i][j]) line += 's'
        else if (!this.shipGrid[i][j] && this.guessGrid[i][j]) line += 'o'
        else if (this.shipGrid[i][j] && this.guessGrid[i][j]) line += '*'
        else line += ' '
        line += '|'
      }
      console.log(line)
      console.log('---------------------')
    }
  }
}
