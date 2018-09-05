import Tile from './Tile'
import { observable, decorate } from 'mobx'
import { clamp } from './math'

class Map {
  constructor(world, size) {
    this.world = world
    size = size ? size : 50
    this.size = size
    this.tiles = []
    for (let y = size - 1; y >= 0; y--) {
      this.tiles[y] = []
      for (let x = 0; x < size; x++) {
        this.tiles[y][x] = new Tile(x, y)
      }
    }
  }
  getTile(x, y) {
    if(this.tiles != undefined && this.tiles[y] != undefined && this.tiles[y][x] != undefined) {
      return this.tiles[y][x]
    }
  }
  getTileFromPixel(x, y, tileSize) {
    x = Math.floor(x / tileSize)
    y = Math.floor(y / tileSize)
    return this.getTile(x, y)
  }
  iterate(callback) {
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        callback(x, y, this.tiles[y][x])
      }
    }
  }
  iterateScreen(options, callback) {
    const yStart = options.yOffset
    const xStart = options.xOffset
    const yEnd = yStart + options.yTiles
    const xEnd = xStart + options.xTiles
    for (let y = yStart; y < yEnd; y++) {
      if(this.tiles != undefined && this.tiles[y] != undefined) {
        for (let x = xStart; x < xEnd; x++) {
          const tile = this.tiles[y][x]
          if(tile != undefined){
            callback(x, y, tile)
          }
        }
      }
    }
  }
}
// decorate(Map, {
//   tiles: observable
// })

export default Map
