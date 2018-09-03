import Map from './Map'
import Nation from './Nation'
import { document } from './main'

export default class World {
  constructor() {
    if (document.world) {
      console.error("World already exists...")
      return
    }
    document.world = this

    this.map = new Map(this, 50)
    document.map = this.map

    this.nations = []
    document.nations = this.nations

    // -- AJAX load nations
    const themis = new Nation(this, "Themis")
    themis.ownTile(this.map.getTile(10,10))
    themis.ownTile(this.map.getTile(11,10))
    themis.ownTile(this.map.getTile(11,11))
    this.nations.push(themis)
  }
}