import React from 'react'
import BasicSelect from './BasicSelect'

class Combobox extends React.Component {
  render() {
    return <BasicSelect mode="combobox"  {...this.props} />
  }
}

export default Combobox