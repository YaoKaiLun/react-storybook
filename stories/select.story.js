import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Select } from '../components'
import Wrapper from './Wrapper'

let dataSource = [
  {text: '服装1', value: '编号1'},
  {text: '服装2', value: '编号2'},
  {text: '服装3', value: '编号3'},
  {text: '服装4', value: '编号4'},
  {text: '服装5', value: '编号5'},
  {text: '服装6', value: '编号6'},
  {text: '服装7', value: '编号7'},
  {text: '服装8', value: '编号8'},
]

storiesOf('Select', module)
  .addDecorator(Wrapper)
  .add('normal', () => <Select dataSource={dataSource} />)
  .add('combobox', () => <Select.Combobox dataSource={dataSource} />)