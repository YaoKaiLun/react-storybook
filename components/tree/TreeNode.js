import React from 'react'
import PropTypes from 'prop-types'
import CaretDownIcon from '../../asset/svg/caret-down.svg'
import CaretRightIcon from '../../asset/svg/caret-right.svg'
import EditIcon from '../../asset/svg/edit.svg'
import DeleteIcon from '../../asset/svg/delete.svg'
import styled from 'styled-components';

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
  color: ${props => props.isActived ? '#108EE9 !important' : 'inherit'};
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
    value: PropTypes.any.require,
    title: PropTypes.string.require,
  }
  static defaultProps = {
    isLeaf: true,
    isExpand: false,
    isActived: false
  }

  renderCaret = ({isLeaf, isExpand}) => {
    if (!isLeaf) {
      return
    }
    return (
      <span style={{width: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
        {isExpand ? <CaretDownIcon /> : <CaretRightIcon />}
      </span>
    )
  }

  renderTitle = ({id, title, isEdit}) => {
    let props = this.props
    if (isEdit) {
      return <input />
    } else {
      return <StyleTitle isActived={props.isActived} title={title} >{title}</StyleTitle>
    }
  }

  toogleHoverState = (target) => {
    this.setState({[target]: !this.state[target]})
  }

  renderToolIcon = ({id, isHovered}) => {
    let toolStyle = {width: '40px', display: 'flex', boxSizing: 'border-box', margin: '0 5px'}
    let iconStyle = {flex: '1', cursor: 'pointer', fontSize: '10px', color: 'red'}
    if (!isHovered) {
      toolStyle.visibility = 'hidden'
    }
    return (
      <div style={toolStyle}>
        <EditIcon style={iconStyle} />
        <DeleteIcon style={iconStyle} />
      </div>
    )
  }

  render() {
    let props = this.props
    let state = this.state

    return (
      <StyleNode top>
        <div style={{display: 'flex', alignItems: 'center'}}
          onMouseEnter={() => { this.toogleHoverState('isNodeHovered') }}
          onMouseLeave={() => { this.toogleHoverState('isNodeHovered') }}>
          {this.renderCaret({isLeaf: props.isLeaf, isExpand: props.isExpand})}
          {this.renderTitle({value: props.value, title: props.title, isEdit: false})}
          {this.renderToolIcon({value: props.value, isHovered: state.isNodeHovered})}
        </div>
        {!props.isLeaf && props.isExpand && <ul>{props.children}</ul>}
      </StyleNode>
    )
  }
}

export default TreeNode