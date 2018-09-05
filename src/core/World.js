import Map from './Map'
import Nation from './Nation'
import { document } from './main'
import { observable, decorate } from 'mobx';

class World {
  constructor(size) {
    if (document.world) {
      console.error("World already exists...")
      return
    }
    document.world = this
    this.size = size

    this.map = new Map(this, size)
    document.map = this.map

    this.nations = []
    document.nations = this.nations

    // -- AJAX load nations
    const themis = new Nation(this, "Themis")
    themis.ownTile(this.map.getTile(3,3))
    themis.ownTile(this.map.getTile(3,4))
    themis.ownTile(this.map.getTile(4,4))
    this.nations.push(themis)

    this.pop = 23
  }

  increment() {
    this.pop += 3
    console.log("Increment to " + this.pop)
  }
}
decorate(World, {
  pop: observable
})

export default World