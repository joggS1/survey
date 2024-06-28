import { create } from 'zustand'
import { createSelectors } from '../../../utils'
import { persist } from 'zustand/middleware'

interface SurveyState {
  surveysData: Record<string, unknown>
  progress: Record<string, number>
  remainingTime: Record<string, number>
  setRemainingTime: (formName: string, time: number) => void
  setProgress: (formName: string, progress: number) => void
  setSurveyData: (formName: string, data: Record<string, unknown>) => void
}

export const surveyStore = create(
  persist<SurveyState>(
    (set, get) => ({
      surveysData: {},
      progress: {},
      remainingTime: {},
      setRemainingTime: (formName, time) =>
        set({ remainingTime: { ...get().remainingTime, [formName]: time } }),
      setProgress: (formName, progress) =>
        set({ progress: { ...get().progress, [formName]: progress } }),

      setSurveyData: (formName, data) =>
        set({
          surveysData: {
            ...get().surveysData,
            [formName]: { ...(get().surveysData[formName] || {}), ...data },
          },
        }),
    }),
    { name: 'survey-store', version: 1 }
  )
)

export const useSurveyStore = createSelectors(surveyStore)

export const selectFormData = (formName: string) => (state: SurveyState) =>
  state.surveysData[formName] ?? {}

export const selectProgress = (formName: string) => (state: SurveyState) =>
  state.progress[formName] ?? 0

export const selectRemainingTime = (formName: string) => (state: SurveyState) =>
  state.remainingTime[formName] ?? null
