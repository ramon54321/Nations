import { decorate, observable } from 'mobx'

class UIState {
  constructor() {}

  setSelectedTile(x, y) {
    this.selectedTile = { x: x, y: y }
  }

  clearSelectedTile() {
    this.selectedTile = undefined
  }
}
decorate(UIState, {
  selectedTile: observable,
})

export default UIState
