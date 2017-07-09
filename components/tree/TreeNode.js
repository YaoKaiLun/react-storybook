import React from 'react'
import PropTypes from 'prop-types'
import CaretDownIcon from '../../asset/svg/caret-down.svg'
import CaretRightIcon from '../../asset/svg/caret-right.svg'
import EditIcon from '../../asset/svg/edit.svg'
import DeleteIcon from '../../asset/svg/delete.svg'

const style = {
  nodeWrapper: {
    width: '100%',
    fontSize: '12px',
    letterSpacing: '1px',
    color: '#919191'
  },
  node: {
    display: 'flex',
    alignItems: 'center'
  },
  caretWrapper: {
    width: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    cursor: 'pointer',
    marginLeft: '5px'
  },
  titleNormal: {
    color: '#919191'
  },
  titleActived: {
    color: '#108EE9'
  },
  titleInput: {
    border: '1px solid rgb(217, 217, 217)',
    borderRadius: '4px',
    outline: '0',
    width: '100%',
    marginLeft: '5px'
  },
  toolBar: {
    width: '40px',
    display: 'flex',
    boxSizing: 'border-box',
    margin: '0 5px',
    marginLeft: '15px'
  },
  hidden: {
    visibility : 'hidden'
  },
  toolBarIcon: {
    flex: '1',
    cursor: 'pointer',
    fontSize: '10px',
    color: 'red'
  }
}

class TreeNode extends React.Component {
  state = {
    isEdit: false,
    isNodeHovered: false,
    isExpand: false,
  }
  static propTypes = {
    isLeaf: PropTypes.bool,
    isExpand: PropTypes.bool,
    isActived: PropTypes.bool,
    value: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    afterEdit: PropTypes.func,
    onDelete: PropTypes.func,
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
      <span style={style['caretWrapper']} onClick={this.toogleExpand}>
        {isExpand ? <CaretDownIcon /> : <CaretRightIcon />}
      </span>
    )
  }

  renderTitle = ({value, title, isEdit}) => {
    let props = this.props
    if (isEdit) {
      return <input className="title-input" ref={(input) => { this.titleInput = input }} onBlur={(e) => { this.handleCompleteEdit(e, value) }}
        style={style['titleInput']} />
    } else {
      return <span className="title-span" style={{...style['title'], ...(props.isActived ? style['titleActived'] : style['titleNormal'])}} title={title} onClick={() => { this.handleSelected(value, title) }}>{title}</span>
    }
  }

  renderToolIcon = ({value, isHovered}) => {
    return (
      <div style={{...style['toolBar'], ...(isHovered ? {} : style['hidden'])}}>
        <span style={style['toolBarIcon']} onClick={this.handleEdit}>
          <EditIcon width='12' height='12' />
        </span>
        <span className="delete-icon" style={style['toolBarIcon']} onClick={() => { this.handleDelete(value) }}>
          <DeleteIcon width='12' height='12' />
        </span>
      </div>
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
    if (props.onDelete) {
      props.onDelete(value)
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
      <div style={style['nodeWrapper']}>
        <div style={style['node']}
          onMouseEnter={() => { this.toogleHoverState('isNodeHovered') }}
          onMouseLeave={() => { this.toogleHoverState('isNodeHovered') }}>
          {this.renderCaret({isLeaf: props.isLeaf, isExpand: state.isExpand})}
          {this.renderTitle({value: props.value, title: props.title, isEdit: state.isEdit})}
          {this.renderToolIcon({value: props.value, isHovered: state.isNodeHovered})}
        </div>
        {!props.isLeaf && state.isExpand && <ul style={{paddingLeft: '15px'}}>{props.children}</ul>}
      </div>
    )
  }
}

export default TreeNode