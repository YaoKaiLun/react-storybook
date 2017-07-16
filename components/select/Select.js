import React from 'react'
import BasicSelect from './BasicSelect'

class Select extends React.Component {
  render() {
    return <BasicSelect mode="normal" {...this.props} />
  }
}

export default Select