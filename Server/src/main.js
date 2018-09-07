import config from './config/config-TARGET_ENV'
import Map from './Map'
import Situation from './Situation'

console.log(`Built with ${config.environment} config`)

const seed = 105
const size = 2
const name = 'Zelda'

const map = new Map(size, seed)
const situation = new Situation()
situation.addNation("Valcom")
situation.addNation("Narnia")

console.log(JSON.stringify(getStateData(), null, 4))

function tick(delta) {}

function getStateData() {
  return {
    seed: seed,
    size: size,
    name: name,
    tiles: map.getTileData(),
    nations: situation.getNationData(),
    developments: situation.getDevelopmentData(),
  }
}
