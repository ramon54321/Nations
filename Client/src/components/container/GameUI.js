import React from 'react'

import { observer } from 'mobx-react'
import Dock from '../presentational/Dock'

class _GameUI extends React.Component {
  constructor(props) {
    super(props)
  }

  getDockItems() {
    let dockItems
    if (document.uiState.selectedTile) {
      dockItems = [
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

  render() {
    const dockItems = this.getDockItems()
    return (
      <React.Fragment>
        <Dock items={dockItems} />
      </React.Fragment>
    )
  }
}

const GameUI = observer(_GameUI)

export default GameUI
