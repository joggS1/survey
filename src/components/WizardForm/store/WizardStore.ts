import { create } from "zustand";
import { createSelectors } from "../../../utils";
import { Step } from "../../../types";


export interface WizardState {
    step: number
    setStep: (step: number) => void
    nextStep: () => void
    prevStep: () => void
    setSteps: (steps: any[]) => void
    steps: Step[]
}


const wizardStore = create<WizardState>((set) => ({
    step: 0,
    steps: [],
    setSteps: (steps) => set({ steps }),
    setStep: (step) => set({ step }),
    nextStep: () => set((state) => ({ step: state.step + 1 })),
    prevStep: () => set((state) => ({ step: state.step - 1 })),
}))

export const useWizardStore = createSelectors(wizardStore)