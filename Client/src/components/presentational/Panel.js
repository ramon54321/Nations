import React from 'react'
import Header from './Header'

import { observer } from 'mobx-react'
import { formatNumber, mapProperty } from '../../core/utils'

function getTile() {
  const x = document.renderer.mouseTileX
  const y = document.renderer.mouseTileY
  if(x && y) {
    return document.gameState.getTile(x, y)
  }
}

class _Panel extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {

    const tile = getTile()
    const developments = tile && mapProperty(tile.developments, (ninth, development) => <li>{development.id}</li>)
    const resources = tile && mapProperty(tile.resources, (resource, amount) => <li>{resource}: {formatNumber(amount)}</li>)

    return (
      <div className="panel">
        <Header text={this.props.header} />
        <ul>
          <li>Tick: {document.gameState.state.tickNumber}</li>
          {developments}
          {resources}
        </ul>
        <button onClick={() => document.renderer.toggleIcons()}>
          {document.renderer.isShowIcons ? 'Turn Icons Off' : 'Turn Icons On'}
        </button>
      </div>
    )
  }
}

const Panel = observer(_Panel)

export default Panel
