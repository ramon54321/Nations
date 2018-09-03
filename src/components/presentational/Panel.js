import React from 'react'
import Header from './Header';

const Panel = (props) => (
  <div className="Panel">
    <Header text={props.header} />
  </div>
)

export default Panel
