export class Ship {
  orientation: 'vertical' | 'horizontal'
  length: 2 | 3 | 4 | 5
  coords: { x: number; y: number; isHit: boolean }[]

  constructor(len) {
    this.length = len
    this.coords = []
  }

  public canPlace(startCoords: { x: number; y: number }): boolean {
    if (this.orientation === 'horizontal') {
      return startCoords.x + this.length < 10
    } else if (this.orientation === 'vertical') {
      return startCoords.y + this.length < 10
    }
    return false
  }

  public doPlace(startCoords: { x: number; y: number }): void {
    for (let i = 0; i < this.length; i++) {
      if (this.orientation === 'horizontal') {
        this.coords.push({
          x: startCoords.x + i,
          y: startCoords.y,
          isHit: false
        })
      } else if (this.orientation === 'vertical') {
        this.coords.push({
          x: startCoords.x,
          y: startCoords.y + i,
          isHit: false
        })
      }
    }
  }

  public hit(hitCoord: { x: number; y: number; isHit: boolean }): void {
    const i = this.coords.findIndex(
      (coord: { x: number; y: number; isHit: boolean }) =>
        coord.x === hitCoord.x && coord.y === hitCoord.y
    )
    this.coords[i].isHit = true
  }

  public isSunk(): boolean {
    return this.coords.every(({ isHit }) => isHit)
  }
}
