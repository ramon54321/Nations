import config from './config/config-TARGET_ENV'
import Map from './Map'
import Situation from './Situation'
import Store from './Store'

console.log(`Built with ${config.environment} config`)

const seed = 105
const size = 2
const name = 'Zelda'

const map = new Map(size, seed)
const situation = new Situation()
const store = new Store()



situation.addNation("Valcom")
situation.addNation("Narnia")

store.addDevelopment({name: "Mill", production: {goods: 2}})



console.log(JSON.stringify(getStateData(), null, 4))

function tick(delta) {}

function getStateData() {
  return {
    seed: seed,
    size: size,
    name: name,
    tiles: map.getTileData(),
    nations: situation.getNationData(),
    developments: store.getDevelopmentData(),
  }
}
