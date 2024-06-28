import { FormProps, Typography } from 'antd'
import { FieldData } from 'rc-field-form/lib/interface'
import { WizardForm } from '../WizardForm'
import { steps } from './steps'
import {
  selectFormData,
  selectProgress,
  selectRemainingTime,
  surveyStore,
  useSurveyStore,
} from './store'
import { useCallback, useEffect, useMemo } from 'react'

const FORM_NAME = 'test_1'

const DEFAULT_REMAINING_TIME = 180

export const SurveyForm = () => {
  const initialValues = surveyStore(selectFormData(FORM_NAME))
  const setFormData = useSurveyStore.use.setSurveyData()
  const initialStep = surveyStore(selectProgress(FORM_NAME))
  const setNewStep = useSurveyStore.use.setProgress()
  const remainingTime = surveyStore(selectRemainingTime(FORM_NAME))
  const setRemainingTime = useSurveyStore.use.setRemainingTime()

  //мемоизация селекторов (reselect)
  const memoizedInitialValues = useMemo(() => initialValues, [])

  useEffect(() => {
    if (remainingTime === 0) return
    const interval = setInterval(() => {
      const remainingTime = surveyStore.getState().remainingTime[FORM_NAME]
      setRemainingTime(FORM_NAME, (remainingTime ?? DEFAULT_REMAINING_TIME) - 1)
      if (remainingTime === 1) {
        clearInterval(interval)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleFieldChange: FormProps['onFieldsChange'] = useCallback(
    (changedFields: FieldData[]) => {
      const fields_data: Record<string, unknown> = {}
      for (const field of changedFields) {
        fields_data[field.name.join('.')] = field.value
      }
      setFormData(FORM_NAME, fields_data)
    },
    []
  )

  const handleStepChange = useCallback((newStep: number) => {
    setNewStep(FORM_NAME, newStep)
  }, [])
  const minutes = Math.floor(remainingTime / 60)
  const seconds = remainingTime % 60

  return (
    <>
      <Typography.Text type={remainingTime === 0 ? 'danger' : undefined}>
        Осталось {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </Typography.Text>
      <WizardForm
        steps={steps}
        name={FORM_NAME}
        initialStep={initialStep}
        onStepChange={handleStepChange}
        onFieldsChange={handleFieldChange}
        initialValues={memoizedInitialValues}
        disabled={remainingTime === 0}
        title="ЕГЭ ??"
      />
    </>
  )
}
