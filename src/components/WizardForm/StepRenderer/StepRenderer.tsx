import { FC } from 'react'
import { WizardState } from '../store'
import { Step, StepFieldType } from '../../../types'

import { Checkbox, Form, Input, Radio, Select } from 'antd'

const { Item } = Form
interface Props {
  step: WizardState['steps'][number]
}

const StepsByTypeMap: Record<StepFieldType, (step: Step) => JSX.Element> = {
  input: ({ question, optional, field_name, ...rest }: Step) => (
    <Item rules={[{ required: !optional }]} label={question} name={field_name}>
      <Input {...rest} />
    </Item>
  ),
  select: ({ question, optional, field_name, ...rest }: Step) => (
    <Item rules={[{ required: !optional }]} label={question} name={field_name}>
      <Select {...rest} />
    </Item>
  ),
  checkbox_group: ({ question, optional, field_name, ...rest }: Step) => (
    <Item rules={[{ required: !optional }]} label={question} name={field_name}>
      <Checkbox.Group {...rest} style={{ flexDirection: 'column', gap: 5 }} />
    </Item>
  ),
  radio: ({ question, optional, field_name, ...rest }: Step) => (
    <Item rules={[{ required: !optional }]} label={question} name={field_name}>
      <Radio.Group
        {...rest}
        style={{ flexDirection: 'column', display: 'flex', gap: 5 }}
      />
    </Item>
  ),
  text_area: ({ question, optional, field_name, ...rest }: Step) => (
    <Item rules={[{ required: !optional }]} label={question} name={field_name}>
      <Input.TextArea {...rest} />
    </Item>
  ),
}

export const StepRenderer: FC<Props> = ({ step }) => {
  return StepsByTypeMap[step.type]?.(step)
}
