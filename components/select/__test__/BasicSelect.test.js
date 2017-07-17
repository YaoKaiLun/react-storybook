import React from 'react'
import { mount } from 'enzyme'
import BasicSelect from '../BasicSelect.js'

describe('BasicSelect Component', () => {
  it('should render input when mode equal combobox', () => {
    const combobox = mount(<BasicSelect mode="combobox" />)
    expect(combobox.find('input').length).toBe(1)
  })

  it('should render input when mode not equal combobox', () => {
    const select = mount(<BasicSelect mode="normal" />)
    expect(select.find('input').length).toBe(0)
  })

  it('should render ul when showDataList state is true', () => {
    const select = mount(<BasicSelect mode="normal" />)
    select.setState({showDataList: true})
    expect(select.find('ul').length).toBe(1)
  })

  it('should does not render ul when showDataList state is false', () => {
    const select = mount(<BasicSelect mode="normal" />)
    select.setState({showDataList: false})
    expect(select.find('ul').length).toBe(0)
  })

  it('should onSelected be called when li is clicked', () => {
    const onSelected = jest.fn()
    const select = mount(<BasicSelect mode="normal" dataSource={[1, 2]} onSelected={onSelected} />)
    select.setState({showDataList: true})
    const li = select.find('li').at(0)
    li.simulate('click')
    expect(onSelected.mock.calls.length).toBe(1)
  })

  it('should onChange be called when combobox input is changed', () => {
    const onChange = jest.fn()
    const combobox = mount(<BasicSelect mode="combobox" onChange={onChange} />)
    const input = combobox.find('input').at(0)
    input.simulate('change', {target: {value: '12'}})
    expect(onChange.mock.calls.length).toBe(1)
  })
})