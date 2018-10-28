import React from 'react'
import { observer } from 'mobx-react'
import { formatNumber, mapProperty } from '../../core/utils'

class _PanelNation extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const gameState = document.gameState
    const clientState = document.clientState
    const nationTiles = gameState.getNationTiles(clientState.nation)
    const nationDevelopments = gameState.getNationDevelopments(clientState.nation)
    return (
      <React.Fragment>
        <h2>Nation</h2>
        <table>
          <tr><td>Tiles</td><td>{nationTiles.length}</td></tr>
          <tr><td>Developments</td><td>{nationDevelopments.length}</td></tr>
        </table>
      </React.Fragment>
    )
  }
}

const PanelNation = observer(_PanelNation)

export default PanelNation
