import React from 'react'
import PropTypes from 'prop-types'
import CaretDownIcon from '../../asset/svg/caret-down.svg'
import CaretRightIcon from '../../asset/svg/caret-right.svg'
import EditIcon from '../../asset/svg/edit.svg'
import DeleteIcon from '../../asset/svg/delete.svg'
import styled from 'styled-components'

const StyleNode = styled.div`
  width: 100%;
  font-size: 12px;
  letter-spacing: 1px;
  color: ${props => props.top ? 'SteelBlue' : 'palevioletred'};
`

const StyleTitle = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  color: ${props => props.isActived ? '#108EE9 !important' : '#919191 !important'};
  margin-left: 5px;
`

const StyleToolIcon = styled.div`
  width: 40px;
  display: flex;
  box-sizing: border-box;
  margin: 0 5px;
  visibility: ${props => props.isHovered ? 'visible' : 'hidden'};
  margin-left: 15px;
  .icon {
    flex: 1;
    cursor: pointer;
    font-size: 10px;
    color: red;

    &:hover {
      fill: blue;
    }
  }
`

class TreeNode extends React.Component {
  state = {
    isEdit: false,
    isNodeHovered: false,
  }
  static propTypes = {
    isLeaf: PropTypes.bool,
    isExpand: PropTypes.bool,
    isActived: PropTypes.bool,
    value: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    afterEdit: PropTypes.func,
    afterDelete: PropTypes.func,
    onSelected: PropTypes.func,
  }
  static defaultProps = {
    isLeaf: true,
    isExpand: false,
    isActived: false
  }

  renderCaret = ({isLeaf, isExpand}) => {
    if (isLeaf) {
      return
    }
    return (
      <span style={{width: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center'}} onClick={this.toogleExpand}>
        {isExpand ? <CaretDownIcon /> : <CaretRightIcon />}
      </span>
    )
  }

  renderTitle = ({value, title, isEdit}) => {
    let props = this.props
    if (isEdit) {
      return <input ref={(input) => { this.titleInput = input }} onBlur={(e) => { this.handleCompleteEdit(e, value) }}
        style={{border: '1px solid rgb(217, 217, 217)', borderRadius: '4px', outline: '0', width: '100%', marginLeft: '5px'}}/>
    } else {
      return <StyleTitle isActived={props.isActived} title={title} onClick={() => { this.handleSelected(value, title) }}>{title}</StyleTitle>
    }
  }

  renderToolIcon = ({value, isHovered}) => {
    return (
      <StyleToolIcon isHovered={isHovered}>
        <EditIcon className="icon" width='12' height='12' onClick={this.handleEdit}/>
        <DeleteIcon className="icon" width='12' height='12' onClick={() => { this.handleDelete(value) }} />
      </StyleToolIcon>
    )
  }

  toogleHoverState = (target) => {
    this.setState({[target]: !this.state[target]})
  }

  toogleExpand = () => {
    this.setState({isExpand: !this.state.isExpand})
  }

  handleEdit = () => {
    this.setState({isEdit: true})
    setTimeout(() => {
      this.titleInput.focus()
    }, 500)
  }

  handleCompleteEdit = (e, value) => {
    let props = this.props
    this.setState({isEdit: false})
    if (props.afterEdit) {
      props.afterEdit(value, e.target.value)
    }
  }

  handleDelete = (value) => {
    let props = this.props
    if (props.afterDelete) {
      props.afterEdit(value)
    }
  }

  handleSelected = (value, title) => {
    let props = this.props
    if (props.onSelected) {
      props.onSelected(value, title)
    }
  }

  componentDidMount () {
    let props = this.props

    this.setState({isExpand: props.isExpand})
  }

  render() {
    let props = this.props
    let state = this.state

    return (
      <StyleNode top>
        <div style={{display: 'flex', alignItems: 'center'}}
          onMouseEnter={() => { this.toogleHoverState('isNodeHovered') }}
          onMouseLeave={() => { this.toogleHoverState('isNodeHovered') }}>
          {this.renderCaret({isLeaf: props.isLeaf, isExpand: state.isExpand})}
          {this.renderTitle({value: props.value, title: props.title, isEdit: state.isEdit})}
          {this.renderToolIcon({value: props.value, isHovered: state.isNodeHovered})}
        </div>
        {!props.isLeaf && state.isExpand && <ul>{props.children}</ul>}
      </StyleNode>
    )
  }
}

export default TreeNode