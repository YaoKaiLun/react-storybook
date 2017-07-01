import React from 'react'
import PropTypes from 'prop-types'

class Tree extends React.Component {
  state = {}
  static propTypes = {
    title: PropTypes.string
  }
  static defaultProps = {
    title: "tree"
  }

  render() {
    let props = this.props

    return (
      <h3>{props.title}</h3>
    )
  }
}

export default Tree