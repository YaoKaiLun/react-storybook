import React from 'react'
import { mount } from 'enzyme'
import NumberRange from '../index.js'

describe('NumberRange Component', () => {
  it('should change number when left input onchange', () => {
    const onInputChange = jest.fn(),
    numberRange = mount(<NumberRange onChange={onInputChange}/>),
    input = numberRange.find('input').at(0)
    input.simulate('change', {target: {value: '12'}})
    expect(onInputChange.mock.calls.length).toBe(1)
    expect(input.node.value).toBe('12')
  })
  it('should change number when rightt input onchange', () => {
    const onInputChange = jest.fn(),
    numberRange = mount(<NumberRange onChange={onInputChange}/>),
    input = numberRange.find('input').at(1)
    input.simulate('change', {target: {value: '12'}})
    expect(onInputChange.mock.calls.length).toBe(1)
    expect(input.node.value).toBe('12')
  })
  it('should not change number when left input input no number', () => {
    const onInputChange = jest.fn(),
    numberRange = mount(<NumberRange onChange={onInputChange}/>),
    input = numberRange.find('input').at(0)
    input.simulate('change', {target: {value: '我'}})
    expect(onInputChange.mock.calls.length).toBe(0)
    expect(input.node.value).not.toBe('我')
  })
})