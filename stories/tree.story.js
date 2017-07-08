import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { Tree } from '../components'

const mockTreeData = [{
  created_at: 1498352255,
  id: 32,
  name: '书籍',
  parent: null,
  subcategories: [
    {
      created_at: 1498352269,
      id: 33,
      name: '科幻',
      parent: {
        id: 32,
        name: '书籍'
      },
      subcategories: [
        {
          created_at: 1498355551,
          id: 46,
          name: '短篇',
          parent: {
            id: 33,
            name: '科幻'
          },
          subcategories: [],
          updated_at: 1499474650
        },
        {
          created_at: 1499474527,
          id: 58,
          name: '长篇',
          parent: {
            id: 33,
            name: '科幻'
          },
          subcategories: [],
          updated_at: 1499474527
        }
      ],
      updated_at: 1499474646
    },
    {
      created_at: 1498530270,
      id: 57,
      name: '魔幻',
      parent: {
        id: 32,
        name: '书籍'
      },
      subcategories: [],
      updated_at: 1499474657
    }
  ],
  updated_at: 1499474499
},{
  created_at: 1498352327,
  id: 35,
  name: '电影',
  parent: null,
  subcategories: [
    {
      created_at: 1499474609,
      id: 59,
      name: '科幻',
      parent: {
        id: 35,
        name: '电影'
      },
      subcategories: [],
      updated_at: 1499474609
    }
  ],
  updated_at: 1499474591
}]

let renderTree = (treeData) => {
  return (
    treeData.map((nodeData) => {
      if (nodeData.subcategories && nodeData.subcategories.length > 0) {
        return (<Tree.Node key={nodeData.id.toString()} value={nodeData.id} title={nodeData.name} isLeaf={false} expanded={false}>
                  {renderTree(nodeData.subcategories)}
                </Tree.Node>)
      } else {
        return <Tree.Node key={nodeData.id.toString()} value={nodeData.id} title={nodeData.name} isLeaf={true} expanded={false} />
      }
    })
  )
}

storiesOf('Tree', module)
  .add('TreeNode', () => (
    <div style={{width: '200px'}}>
      <Tree.Node isLeaf={true} value="1" title="Node" afterEdit={action('after edit')} afterDelete={action('after delete')} />
    </div>
  ))
  .add('nest tree', () => (
    <Tree value={35} afterEdit={action('after edit')} afterDelete={action('after delete')} onSelected={action('selected')}>
      {renderTree(mockTreeData)}
    </Tree>
  ))