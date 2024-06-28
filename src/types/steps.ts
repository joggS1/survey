import { ReactNode } from 'react'

export type StepFieldType =
  | 'input'
  | 'text_area'
  | 'radio'
  | 'checkbox_group'
  | 'select'


export type BaseStep<Type extends StepFieldType> = {
  question: string
  type: Type
  field_name: string
  optional?: boolean
  placeholder?: string
}

export type InputStep = BaseStep<'input' | 'text_area' > & {}

export type StepWithOptions = BaseStep<'select' | 'checkbox_group' | 'radio'> & {
  options: Array<{label: ReactNode, value: string | number | null; }>
}

export type Step = InputStep | StepWithOptions