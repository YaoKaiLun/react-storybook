import React from 'react'
import { mount } from 'enzyme'
import Tree from '../index.js'

describe('TreeNode Component', () => {
  it('should isEdit is false and input count is 0', () => {
    const treeNode = mount(<Tree.Node title="node" value="1" />)
    expect(treeNode.state('isEdit')).toBe(false)
    expect(treeNode.find('input').length).toBe(0)
    treeNode.setState({isEdit: true})
    expect(treeNode.find('input').length).toBe(1)
  })

  it('should input count is 1 when change isEdit', () => {
    const treeNode = mount(<Tree.Node title="node" value="1" />)
    treeNode.setState({isEdit: true})
    expect(treeNode.find('input').length).toBe(1)
  })

  it('should onSelected be called when title span is clicked', () => {
    const onSelected = jest.fn(),
      treeNode = mount(<Tree.Node title="node" value="1" onSelected={onSelected} />),
      titleSpan = treeNode.find('.title-span').at(0)
    titleSpan.simulate('click')
    expect(onSelected.mock.calls.length).toBe(1)
  })

  it('should afterEdit be called when input blur', () => {
    const afterEdit = jest.fn(),
      treeNode = mount(<Tree.Node title="node" value="1" isLeaf={false} afterEdit={afterEdit} />)
    treeNode.setState({isEdit: true})
    const titleInput = treeNode.find('.title-input')
    titleInput.simulate('blur')
    expect(afterEdit.mock.calls.length).toBe(1)
  })

  it('should onDelete be called when delete icon is clicked', () => {
    const onDelete = jest.fn(),
      treeNode = mount(<Tree.Node title="node" value="1" isLeaf={false} onDelete={onDelete} />),
      deleteIcon = treeNode.find('.delete-icon')
    deleteIcon.simulate('click')
    expect(onDelete.mock.calls.length).toBe(1)
  })
})