import React from 'react'

import { observer } from 'mobx-react'
import Icon from './Icon'

class _DockItem extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="dock_item interactive" onClick={this.props.onClick}>
        <Icon icon={this.props.icon} />
      </div>
    )
  }
}

const DockItem = observer(_DockItem)

export default DockItem
