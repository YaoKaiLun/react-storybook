import React from 'react'
import { mount } from 'enzyme'
import EditableText from '../index.js'

describe('EditableText Component', () => {
  it('should render input when isEditable state is true', () => {
    const editableText = mount(<EditableText />)
    editableText.setState({isEditable: true})
    expect(editableText.find('input').length).toBe(1)
  })

  it('should render input when isEditable state is false', () => {
    const editableText = mount(<EditableText />)
    editableText.setState({isEditable: false})
    expect(editableText.find('input').length).toBe(0)
  })

  it('should onChange be called when the input is changed', () => {
    const onChange = jest.fn()
    const editableText = mount(<EditableText onChange={onChange} />)
    editableText.setState({isEditable: true})
    const input = editableText.find('input').at(0)
    input.simulate('change', {target: {value: '12'}})
    expect(onChange.mock.calls.length).toBe(1)
  })
})