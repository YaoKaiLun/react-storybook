import React from 'react'
import PropTypes from 'prop-types'

const style = {
  option: {
    cursor: 'point',
    padding: '3px 5px',
  }
}

class Option extends React.Component {
  state = {
    dataListHover: false,
  }

  static propTypes = {
    data: PropTypes.any,
    onSelected: PropTypes.func,
  }

  static defaultProps = {}

  handleDataListHover = (flag) => {
    this.setState({dataListHover: flag})
  }

  onSelected = (value, text) => {
    if (this.props.onSelected) {
      this.props.onSelected(value, text)
    }
  }

  render() {
    let props = this.props
    let state = this.state
    let data = props.data
    let optionStyle
    let value
    let text
    if (state.dataListHover) {
      optionStyle = {...style.option, ...{backgroundColor: '#b8d9e7'}}
    } else {
      optionStyle = {...style.option}
    }
    if(typeof props.data === 'object' && data.text && data.value) {
      value = data.value
      text = data.text
    } else {
      value = data
      text = data
    }
    return (
      <li
        style={optionStyle}
        onMouseEnter={() => {this.handleDataListHover(true)}}
        onMouseLeave={() => {this.handleDataListHover(false)}}
        onClick={() => { this.onSelected(value, text) }}>
        {text}
      </li>
    )
  }
}

export default Option