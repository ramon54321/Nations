import { decorate, observable, computed } from 'mobx'
import { forEachProperty } from './utils'

class GameState {
  constructor(initialState) {
    this.state = initialState
  }

  updateState(newState) {
    this.state = newState
    this.pureState = newState
  }

  getTile(x, y) {
    return this.state.tiles[y * this.state.size + x]
  }

  getNations() {
    return this.state.nations
  }

  getNationTiles(nationName) {
    const tiles = []
    this.state.nations[nationName].tiles.forEach(tile => {
      tiles.push(this.getTile(tile[0], tile[1]))
    })
    return tiles
  }

  getNationDevelopments(nationName) {
    const developments = []
    const tiles = this.getNationTiles(nationName)
    tiles.forEach(tile => {
      forEachProperty(tile.developments, property => {
        developments.push(property)
      })
    })
    return developments
  }
}
decorate(GameState, {
  state: observable
})

export default GameState