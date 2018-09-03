export default class Nation {
  constructor(world, name) {
    this.tiles = []
    this.world = world
    this.name = name
  }

  ownTile(tile) {
    this.tiles.push(tile)
    tile.setNation(this)
  }

  toString() {
    return `
      Tiles:
        ${this.tiles.map(tile => tile.toString() + "\n        ")}
    `
  }
}