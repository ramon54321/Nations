import React from 'react'

import { observer } from 'mobx-react'
import DockItem from './DockItem'

class _Dock extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const dockItems = this.props.items.map(item => {
      return <DockItem icon={item.icon} name={item.name} />
    })
    return <div className="dock">{dockItems}</div>
  }
}

const Dock = observer(_Dock)

export default Dock
