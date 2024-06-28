import { Step } from "../../types";

export const steps: Step[] = [
    {
      question: 'Вопрос 1',
      type: 'input',
      field_name: 'answer_1',
      placeholder: 'Ответ',
    },
    {
      question: 'Вопрос 2',
      field_name: 'answer_2',
      type: 'select',
      options: [
        {
          label: 'Вариант 1',
          value: 1,
        },
        {
          label: 'Вариант 2',
          value: 2,
        },
        {
          label: 'Вариант 3',
          value: 3,
        },
      ],
    },
    {
      question: 'Вопрос 3',
      field_name: 'answer_3',
      type: 'radio',
      options: [
        {
          label: 'Вариант 1',
          value: 1,
        },
        {
          label: 'Вариант 2',
          value: 2,
        },
        {
          label: 'Вариант 3',
          value: 3,
        },
      ],
    },
    {
      question: 'Вопрос 4',
      field_name: 'answer_4',
      type: 'checkbox_group',
      options: [
        {
          label: 'Вариант 1',
          value: 1,
        },
        {
          label: 'Вариант 2',
          value: 2,
        },
        {
          label: 'Вариант 3',
          value: 3,
        },
      ],
    },
    {
      question: 'Вопрос 5',
      optional: true,
      field_name: 'answer_5',
      type: 'text_area',
      placeholder: 'Развернутый ответ',
    },
  ]