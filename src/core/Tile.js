export default class Tile {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.nation = null
  }

  setNation(nation) {
    this.nation = nation
  }

  toString() {
    return `Tile: ${this.x}, ${this.y}     Owner: ${this.nation.name}`
  }
}