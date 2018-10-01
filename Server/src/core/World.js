import Tile from './Tile'

class World {
  constructor(size, seed) {
    this.size = size
    this.seed = seed
    this.initTiles()
  }

  initTiles() {
    this.tiles = []
    for (let y = 0; y < this.size; y++) {
      this.tiles[y] = []
      for (let x = 0; x < this.size; x++) {
        this.tiles[y][x] = new Tile(x, y)
      }
    }
  }

  getTile(x, y) {
    if(this.tiles != undefined && this.tiles[y] != undefined && this.tiles[y][x] != undefined) {
      return this.tiles[y][x]
    }
  }

  getTiles() {
    return this.tiles
  }

  getTilesFlat() {
    // TODO: Possible optimization by storing flat() in var since its references
    return this.tiles.flat()
  }

  getTilesData() {
    const tileData = []
    const tiles = this.getTilesFlat()
    for (let i = 0; i < tiles.length; i++) {
      const data = tiles[i].getData()
      if (data) {
        tileData.push(data)
      }
    }
    return tileData
  }
}

export default World
