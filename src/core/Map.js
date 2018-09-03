import Tile from './Tile'

export default class Map {
  constructor(world, size) {
    this.world = world
    size = size ? size : 50
    this.tiles = []
    for (let y = size-1; y >= 0; y--) {
      this.tiles[y] = []
      for (let x = 0; x < size; x++) {
        this.tiles[y][x] = new Tile(x, y)
      }
    }
  }
  getTile(x, y) {
    return this.tiles[y][x]
  }
}
