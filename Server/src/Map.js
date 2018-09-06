import Tile from './Tile'

class Map {
  constructor(size, seed) {
    this.size = size
    this.seed = seed
    this.initTiles()
  }

  initTiles() {
    this.tiles = []
    for (let i = 0; i < this.size * this.size; i++) {
      this.tiles[i] = new Tile()
    }
  }

  getTileData() {
    const tileData = []
    for (let i = 0; i < this.tiles.length; i++) {
      const data = this.tiles[i].getData()
      if (data) {
        tileData.push(data)
      }
    }
    return tileData
  }
}

export default Map
