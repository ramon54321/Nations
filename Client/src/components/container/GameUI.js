import React from 'react'

import { observer } from 'mobx-react'
import Dock from '../presentational/Dock'

class _GameUI extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const dockItems = document.uiState.getDockItems()
    const mainPanel = document.uiState.getMainPanel()
    return (
      <React.Fragment>
        {mainPanel}
        <Dock items={dockItems} />
      </React.Fragment>
    )
  }
}

const GameUI = observer(_GameUI)

export default GameUI
