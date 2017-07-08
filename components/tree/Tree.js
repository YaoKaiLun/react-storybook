import React from 'react'
import PropTypes from 'prop-types'

class Tree extends React.Component {
  state = {
    currentValue: ''
  }
  static propTypes = {
    value: PropTypes.any,
    afterEdit: PropTypes.func,
    afterDelete: PropTypes.func,
    onSelected: PropTypes.func
  }
  static defaultProps = {
    value: ''
  }

  onSelected = (id, title) => {
    let props = this.props
    this.setState({currentValue: id})
    if(props.onSelected) {
      props.onSelected(id, title)
    }
  }

  extendChild = (children) => {
    let props = this.props, state = this.state, _this = this

    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) { return child }

      let isActived = false
      if (state.currentValue === child.props.value) {
        isActived = true
      }

      return React.cloneElement(child, {
        afterDelete: props.afterDelete,
        afterEdit: props.afterEdit,
        onSelected: _this.onSelected,
        isActived,
        children: this.extendChild(child.props.children)
      })
    })
  }

  componentDidMount () {
    this.setState({currentValue: this.props.value})
  }

  render() {
    let props = this.props
    return (
      <ul>
        {this.extendChild(props.children)}
      </ul>
    )
  }
}

export default Tree