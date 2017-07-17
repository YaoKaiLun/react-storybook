import React from 'react'
import PropTypes from 'prop-types'
import ArrowDownIcon from '../../asset/svg/arrow-down.svg'
import ArrowUpIcon from '../../asset/svg/arrow-up.svg'
import Option from './Option'

const selectBoxHeight = '27px'
const selectBoxWidth = '200px'

const style = {
  selectInput: {
    display: 'flex',
    alignItems: 'center',
    height: selectBoxHeight,
    width: selectBoxWidth,
    cursor: 'pointer',
    boxShadow: '0 1px 6px rgba(0,0,0,.2)',
  },
  searchInput: {
    position: 'relative',
    height: selectBoxHeight,
    width: selectBoxWidth,
    boxSizing: 'border-box',
  },
  searchInputSelect: {
    display: 'inline-block',
    width: '93%',
    paddingLeft: '5px',
    boxSizing: 'border-box',
  },
  dataListBox: {
    position: 'relative',
    left: '0',
    top: '2px',
    margin: '0',
    paddingLeft: '0',
    width: selectBoxWidth,
    maxHeight: '200px',
    overflow: 'scroll',
    listStyle: 'none',
    boxShadow: '0 1px 6px rgba(0,0,0,.2)',
    boxSizing: 'border-box',
  }
}

class BasicSelect extends React.Component {
  state = {
    searchWord: '',
    showDataList: false,
    selectedText: '',
  }

  static propTypes = {
    dataSource: PropTypes.array,
    onSelected: PropTypes.func,
    onChange: PropTypes.func,
    onScroll: PropTypes.func,
  }

  static defaultProps = {}

  searchWordChange = (e) => {
    this.setState({searchWord: e.target.value})
  }

  renderSelectBox = () => {
    let props = this.props
    switch (props.mode) {
    case 'normal':
      return this.renderSelectInput()
    case 'combobox':
      return this.renderSearchInput()
    default:
      return <div>error</div>
    }
  }

  renderSelectInput = () => {
    let state = this.state
    let iconSize = '8'
    return (
      <div style={style.selectInput} onClick={this.toggleShowDataList}>
        <div style={style.searchInputSelect}>{state.selectedText}</div>
        <span style={{ display: 'inline-block', width: '7%' }}>
          <span>
            {
              state.showDataList ? <ArrowDownIcon width={iconSize} height={iconSize} /> : <ArrowUpIcon width={iconSize} height={iconSize} />
            }
          </span>
        </span>
      </div>
    )
  }

  renderSearchInput = () => {
    let state = this.state
    return (
      <input
        style={style.searchInput}
        value={state.searchWord}
        onChange={this.searchWordChange}
        onFocus={() => { this.setState({showDataList: true}) }}
        onBlur={() => { setTimeout(() => { this.setState({showDataList: false}) }, 200) }}
      />
    )
  }

  renderDataList = () => {
    let props = this.props
    let state = this.state
    if (state.showDataList) {
      return (
        <ul style={style.dataListBox} onScroll={this.dataListScroll}>
          {
            props.dataSource &&
            props.dataSource.map((data) => {
              return <Option data={data} key={data.value ? data.value : data} onSelected={this.onSelected} />
            })
          }
        </ul>
      )
    }
  }

  toggleShowDataList = () => {
    this.setState({showDataList: !this.state.showDataList})
  }

  onSelected = (value, text) => {
    let props = this.props
    if (props.mode === 'combobox') {
      this.setState({searchWord: text, showDataList: false})
    } else {
      this.setState({selectedText: text, showDataList: false})
    }
    if (props.onSelected) {
      props.onSelected(value, text)
    }
  }

  searchWordChange = (e) => {
    this.setState({searchWord: e.target.value})
    if (this.props.onChange) {
      this.props.onChange(e.target.value)
    }
  }

  dataListScroll = (e) => {
    let props = this.props
    let target = e.target
    if (props.moda !== 'combobox') return
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      if (props.onScroll) {
        props.onScroll()
      }
    }
  }

  render() {
    let props = this.props
    return (
      <div>
        {this.renderSelectBox(props.mode)}
        {this.renderDataList()}
      </div>
    )
  }
}

export default BasicSelect