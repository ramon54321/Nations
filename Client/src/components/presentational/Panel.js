import React from 'react'
import Header from './Header'

import { observer } from 'mobx-react'

const Panel = observer(props => (
  <div className="panel">
    <Header text={props.header} />
    <ul>
      <li>Population</li>
      <li onClick={() => document.renderer.toggleIcons()}>{document.renderer.isShowIcons ? "Turn Icons Off" : "Turn Icons On"}</li>
      <li>Trade</li>
      <li>Diplomacy</li>
      <li>Research</li>
      <li>Tile: {document.renderer.mouseTileX}, {document.renderer.mouseTileY}</li>
    </ul>
  </div>
))

export default Panel
