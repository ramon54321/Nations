import { decorate, observable } from 'mobx'

class UIState {
  constructor() {}

  setSelectedTile(x, y) {
    this.selectedTile = { x: x, y: y }
  }

  clearSelectedTile() {
    this.selectedTile = undefined
  }

  getDockItems() {
    let dockItems
    if (this.selectedTile) {
      dockItems = [
        {
          icon: 'fas fa-undo',
          name: 'Return',
          onClick: () => {
            this.clearSelectedTile()
          }
        },
        {
          icon: 'fab fa-houzz',
          name: 'Developments',
        },
      ]
    } else {
      dockItems = [
        {
          icon: 'fab fa-houzz',
          name: 'Developments',
        },
        {
          icon: 'fas fa-cog',
          name: 'Settings',
        },
      ]
    }
    return dockItems
  }
}
decorate(UIState, {
  selectedTile: observable,
})

export default UIState
