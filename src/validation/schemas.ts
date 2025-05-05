import { z } from 'zod';

export const personalInfoSchema = z.object({
  name: z.string().min(1, 'This field is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^\d+$/, 'Phone number must contain only numbers'),
});

export const planSchema = z.object({
  type: z.enum(['arcade', 'advanced', 'pro']),
  billing: z.enum(['monthly', 'yearly']),
});

export const addOnsSchema = z.object({
  'online-service': z.boolean(),
  'larger-storage': z.boolean(),
  'customizable-profile': z.boolean(),
});

export const formSchema = z.object({
  personalInfo: personalInfoSchema,
  plan: planSchema,
  addOns: addOnsSchema,
}); 