import { decorate, observable, computed } from 'mobx'

class GameState {
  constructor(initialState) {
    this.state = initialState
  }
  updateState(newState) {
    this.state = newState
  }

  getTile(x, y) {
    return this.state.tiles[y * this.state.size + x]
  }
}
decorate(GameState, {
  state: observable
})

export default GameState