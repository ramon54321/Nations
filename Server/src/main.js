import config from './config/config-__BUILD_ENV__'
export { config }
import './utils'
import { debug } from './utils'
import store from './config/store.json'
import rules from './config/rules.json'
import UserInterface from './ui/UserInterface'
import WebSocketServer from './networking/WebSocketServer'
import World from './core/World'
import Situation from './core/Situation'
// import Store from '../Store'
import CommandQueue from './messaging/CommandQueue'
import * as MessageBuilder from './messaging/messageBuilder'

// import * as Diff from 'jsondiffpatch'

// const stateA = {
//   gold: 11
// }

// const stateB = {
//   gold: 22,
//   wood: 7
// }

// const patchAB = Diff.diff(stateA, stateB)

// console.log("State A")
// console.log(JSON.stringify(stateA, null, 4))

// console.log("State B")
// console.log(JSON.stringify(stateB, null, 4))

// console.log("Patch")
// console.log(JSON.stringify(patchAB, null, 4))

// Diff.patch(stateA, patchAB)

// console.log("State A")
// console.log(JSON.stringify(stateA, null, 4))

/**
 * Server state, ui and websocket server
 */
export const serverState = {
  tickNumber: 0
}
serverState.store = store
serverState.rules = rules

const userInterface = new UserInterface()
serverState.userInterface = userInterface

debug(`Built with ${config.environment} config`)

const webSocketServer = new WebSocketServer()
serverState.webSocketServer = webSocketServer

/**
 * Initialization of server state
 */
const seed = 105
const size = 20
const name = 'Zelda'

const world = new World(size, seed)
serverState.world = world

const situation = new Situation()
serverState.situation = situation

situation.addNation('Valcom')
situation.addNation('Narnia')

world.getTile(7, 4).developments["ne"] = store.developments['loggingOutpost']

// TODO: Client user interface enhancements -> Show resources
// TODO: Think about how to break apart logic (tiles are king!)

/**
 * Command queue initialization
 */
const clientCommandQueue = new CommandQueue()
const serverCommandQueue = new CommandQueue()

/**
 * Game tick logic
 */
setInterval(() => tick(1000), 1000)

function tick(delta) {
  // Increment tickNumber
  serverState.tickNumber++

  // Process Client Input
  const clientCommands = clientCommandQueue.get()
  clientCommands.forEach(clientCommand => {})
  clientCommandQueue.clear()

  // Process Tiles
  const tiles = world.getTilesFlat()
  tiles.forEach(tile => tile.tick(delta))

  // Send GameState to Client
  serverState.gameState = getGameState()
  webSocketServer.broadcast(MessageBuilder.buildGameStateMessage())

  // Update User Interface
  userInterface.tick()
}

debug(getGameState())

/**
 * General functions
 */
export function getGameState() {
  return {
    tickNumber: serverState.tickNumber,
    seed: seed,
    size: size,
    name: name,
    store: store,
    tiles: world.getTilesData(),
    nations: situation.getNationData(),
  }
}
