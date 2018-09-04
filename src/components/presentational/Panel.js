import React from 'react'
import Header from './Header'

import {observer} from 'mobx-react';

const Panel = observer((props) => (
  <div className="panel">
    <Header text={props.header} />
    <ul>
      <li>Population: {null}</li>
      <li onClick={() => null}>Resources</li>
      <li>Trade</li>
      <li>Diplomacy</li>
      <li>Research</li>
    </ul>
  </div>
))

export default Panel
