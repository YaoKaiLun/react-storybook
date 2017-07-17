import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { EditableText } from '../components'
import Wrapper from './Wrapper'

storiesOf('EditableText', module)
  .addDecorator(Wrapper)
  .add('normal', () => <EditableText value="editable text" />)