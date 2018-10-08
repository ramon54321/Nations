import React from 'react'
import Panel from '../components/presentational/Panel'
import { decorate, observable } from 'mobx'

class UIState {
  constructor() {

  }

  setSelectedTile(x, y) {
    this.selectedTile = { x: x, y: y }
  }

  resetMenus() {
    this.selectedTile = undefined
    this.chosenPanel = undefined
  }

  getMainPanel() {
    if (this.selectedTile) {
      switch(this.chosenPanel) {
        case 'developments':
          return (<Panel>Tile Developments</Panel>)
        case 'resources':
          return (<Panel>Tile Resources</Panel>)
        default:
          return (<Panel>{`Overview: ${this.selectedTile.x}, ${this.selectedTile.y}`}</Panel>)
      }
    } else {
      switch(this.chosenPanel) {
        case 'tasks':
          return (<Panel>Tasks</Panel>)
        case 'settings':
          return (<Panel>Settings</Panel>)
        default:
          return (<Panel>{`Hover: ${document.renderer.mouseTileX}, ${document.renderer.mouseTileY}`}</Panel>)
      }
    }
  }

  getDockItems() {
    if (this.selectedTile) {
      return [
        {
          icon: 'fas fa-undo',
          name: 'Return',
          onClick: () => {
            this.resetMenus()
          }
        },
        {
          icon: 'fab fa-houzz',
          name: 'Developments',
          onClick: () => {
            this.chosenPanel = 'developments'
          },
        },
        {
          icon: 'fas fa-coins',
          name: 'Resources',
          onClick: () => {
            this.chosenPanel = 'resources'
          },
        },
      ]
    } else {
      return [
        {
          icon: 'fas fa-tasks',
          name: 'Tasks',
          onClick: () => {
            this.chosenPanel = 'tasks'
          },
        },
        {
          icon: 'fas fa-cog',
          name: 'Settings',
          onClick: () => {
            this.chosenPanel = 'settings'
          },
        },
      ]
    }
  }
}
decorate(UIState, {
  selectedTile: observable,
  chosenPanel: observable,
})

export default UIState
