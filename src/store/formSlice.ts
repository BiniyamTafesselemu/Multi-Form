import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';
import { personalInfoSchema, planSchema, addOnsSchema } from '../validation/schemas';

type PersonalInfo = z.infer<typeof personalInfoSchema>;
type Plan = z.infer<typeof planSchema>;
type AddOns = z.infer<typeof addOnsSchema>;

interface FormState {
  currentStep: number;
  personalInfo: PersonalInfo;
  plan: Plan | null;
  addOns: AddOns;
}

const initialState: FormState = {
  currentStep: 1,
  personalInfo: {
    name: '',
    email: '',
    phone: '',
  },
  plan: null,
  addOns: {
    'online-service': false,
    'larger-storage': false,
    'customizable-profile': false,
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    updatePersonalInfo: (state, action: PayloadAction<PersonalInfo>) => {
      state.personalInfo = action.payload;
    },
    updatePlan: (state, action: PayloadAction<Plan>) => {
      state.plan = action.payload;
    },
    updateAddOns: (state, action: PayloadAction<AddOns>) => {
      state.addOns = action.payload;
    },
    resetForm: () => initialState,
  },
});

export const { setCurrentStep, updatePersonalInfo, updatePlan, updateAddOns, resetForm } = formSlice.actions;
export default formSlice.reducer; 