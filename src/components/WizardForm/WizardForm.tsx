import {
  Button,
  Card,
  Flex,
  Form,
  FormProps,
  notification,
  Progress,
  Spin,
} from 'antd'
import { WizardState, useWizardStore } from './store'
import { FC, memo, useEffect } from 'react'
import { StepRenderer } from './StepRenderer'

import styles from './WizardForm.module.css'

const { useForm } = Form

interface Props extends FormProps {
  steps: WizardState['steps']
  initialStep?: number
  title: string
  onStepChange?: (step: number) => void
}

export const WizardForm: FC<Props> = memo(({
  steps,
  title,
  initialStep = 0,
  onStepChange,
  ...rest
}) => {
  const [form] = useForm()

  const setSteps = useWizardStore.use.setSteps()
  const currentStep = useWizardStore.use.step()
  const storedSteps = useWizardStore.use.steps()
  const nextStep = useWizardStore.use.nextStep()
  const setStep = useWizardStore.use.setStep()
  const prevStep = useWizardStore.use.prevStep()

  const handleNextStep = () => {
    form
      .validateFields()
      .then(() => {
        onStepChange?.(currentStep + 1)
        nextStep()
      })
      .catch(() => {
        notification.error({
          message: 'В форме допущены ошибки',
          placement: 'bottomLeft',
        })
      })
  }
  const handlePrevStep = () => {
    onStepChange?.(currentStep - 1)
    prevStep()
  }

  // получение из api?
  useEffect(() => {
    setSteps(steps)
    setStep(initialStep)
    return () => setSteps([])
  }, [])

  if (!storedSteps.length) return <Spin spinning fullscreen />

  return (
    <Card title={title}>
      <Form form={form} layout="vertical" {...rest}>
        <div className={styles.form_container}>
          <Progress percent={(100 / storedSteps.length) * (currentStep + 1)} />
          <StepRenderer step={storedSteps[currentStep]} />
          <Flex gap={10}>
            <Button disabled={!currentStep} onClick={handlePrevStep}>
              Назад
            </Button>
            {currentStep < storedSteps.length - 1 && (
              <Button type="primary" onClick={handleNextStep}>
                Далее
              </Button>
            )}
            {currentStep === storedSteps.length - 1 && (
              <Button type="primary" onClick={() => alert('Завершено')}>
                Завершить
              </Button>
            )}
          </Flex>
        </div>
      </Form>
    </Card>
  )
})
