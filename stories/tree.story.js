import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { Tree } from '../components'

storiesOf('Tree', module)
  .add('default title', () => <Tree />)
  .add('custom title', () => <Tree title="story begin" />)