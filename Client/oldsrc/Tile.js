import { observable, decorate } from 'mobx';
import { perlin } from './terrain/noise'

class Tile {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.nation = null

    const tmp = (perlin((this.x / 80), (this.y / 80), 11.5) + 1) / 2

    this.type = tmp * 4
  }

  setNation(nation) {
    this.nation = nation
  }

  toString() {
    return `Tile: ${this.x}, ${this.y}     Owner: ${this.nation.name}`
  }
}
decorate(Tile, {
  nation: observable
})

export default Tile