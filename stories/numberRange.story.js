import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { NumberRange } from '../components'
import Wrapper from './Wrapper'

storiesOf('NumberRange', module)
  .addDecorator(Wrapper)
  .add('normal', () => <NumberRange />)