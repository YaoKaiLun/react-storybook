import React from 'react'
import PropTypes from 'prop-types'
import EditIcon from '../../asset/svg/edit.svg'

const height = '25px'
const style = {
  uneditableText: {
    width: '100%',
    height: height,
    display: 'flex',
    alignItems: 'center',
  },
  editableInput: {
    width: '100%',
    height: height,
  }
}

class EditableText extends React.Component {
  state = {
    value: this.props.value ? this.props.value : '',
    isEditable: false
  }

  static propTypes = {
    value: PropTypes.any
  }

  handleInputChange = (e) => {
    this.setState({value: e.target.value})
    let props = this.props
    if (props.onChange) {
      props.onChange(e.target.value)
    }
  }

  toggleEditStatus = (status) => {
    this.setState({isEditable: status})
    if (status) {
      setTimeout(() => { this.valueInput.focus() }, 500)
    }
  }

  renderEditable = () => {
    return <input style={style.editableInput} ref={(input) => { this.valueInput = input }} value={this.state.value} onChange={this.handleInputChange} onBlur={() => { this.toggleEditStatus(false) }} />
  }

  renderUneditable = () => {
    return (
      <div style={style.uneditableText}>
        <div>{this.state.value}</div>
        <span style={{marginLeft: '20px'}} onClick={() => { this.toggleEditStatus(true) }}>
          <EditIcon width='12' height='12' />
        </span>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState(() => ({value: nextProps.value}))
    }
  }

  render() {
    let state = this.state
    return state.isEditable ? this.renderEditable() : this.renderUneditable()
  }
}

export default EditableText