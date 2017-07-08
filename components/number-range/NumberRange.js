import React from 'react'
import PropTypes from 'prop-types'
import {isNumber} from '../util'

const numberInputStyle = {
  border: '0',
  flex: '1',
  textAlign: 'center',
  outline: '0',
  color: 'rgba(0,0,0,.65)',
  fontSize: '12px'
}

class NumberRange extends React.Component {
  state = {
    value: [0, 0]
  }

  static propTypes = {
    value: PropTypes.arrayOf(PropTypes.number),
    placeholder: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func
  }

  static defaultProps = {
    value: [0, 0],
    placeholder: ['', '']
  }

  handleInputChange = (e, direction) => {
    let props = this.props, state = this.state, newValue = [], result = e.target.value
    if (!isNumber(result)) {
      return
    }
    if (direction === 'left') {
      newValue = [result, state.value[1]]
    } else if (direction === 'right') {
      newValue = [state.value[0], result]
    }

    this.setState({value: newValue})

    if(this.props.onChange) {
      props.onChange(newValue)
    }
  }

  componentDidMount () {
    this.setState({value: this.props.value})
  }

  render() {
    let state = this.state
    let props = this.props

    return (
      <div style={{display: 'flex', border: '1px solid #d9d9d9', justifyContent: 'center',
        alignItems: 'center', padding: '3px', borderRadius: '4px'}}>
        <input
          value={state.value[0]}
          placeholder={props.placeholder[0]}
          onChange={(e) => { this.handleInputChange(e, 'left') }}
          style={numberInputStyle}
        />
        <span style={{width: '5%', textAlign: 'center', color: 'rgba(0,0,0,.65)'}}> ~ </span>
        <input
          value={state.value[1]}
          placeholder={props.placeholder[1]}
          onChange={(e) => { this.handleInputChange(e, 'right') }}
          style={numberInputStyle}
        />
      </div>
    )
  }
}

export default NumberRange