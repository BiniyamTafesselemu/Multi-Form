import { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { personalInfoSchema } from '../../validation/schemas';
import { updatePersonalInfo, setCurrentStep } from '../../store/formSlice';
import { RootState } from '../../store';
import type { z } from 'zod';

type PersonalInfoForm = z.infer<typeof personalInfoSchema>;

const PersonalInfo = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { personalInfo } = useSelector((state: RootState) => state.form);

  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoForm>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: personalInfo,
  });

  const onSubmit = (data: PersonalInfoForm) => {
    dispatch(updatePersonalInfo(data));
    dispatch(setCurrentStep(2));
  };

  useImperativeHandle(ref, () => ({
    submit: () => {
      if (submitBtnRef.current) submitBtnRef.current.click();
    },
  }));

  useEffect(() => {
    const handler = () => handleSubmit(onSubmit)();
    window.addEventListener('personalInfoSubmit', handler);
    return () => window.removeEventListener('personalInfoSubmit', handler);
  }, [handleSubmit]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:space-y-12 md:py-12">
      <div>
        <h1 style={{ color: 'hsl(213, 96%, 18%)' }} className="text-2xl font-bold">
          Personal Info
        </h1>
        <p style={{ color: 'hsl(231, 11%, 63%)' }} className="mt-2">
          Please provide your name, email address, and phone number.
        </p>
      </div>

      <div className="space-y-4 md:space-y-8">
        <div className="relative">
          <label htmlFor="name" style={{ color: 'hsl(213, 96%, 18%)' }} className="block text-sm font-medium">
            Name
          </label>
          {errors.name && (
            <p style={{ color: '#7b1e1e' }} className="absolute right-0 top-0 text-xs font-medium">
              {errors.name.message}
            </p>
          )}
          <input
            type="text"
            id="name"
            {...register('name')}
            style={{
              borderColor: errors.name ? '#7b1e1e' : 'hsl(229, 24%, 87%)'
            }}
            className={`mt-1 block w-full rounded-md border p-2 focus:border-purplish-blue focus:ring-purplish-blue transition-colors ${errors.name ? 'border-[2px]' : ''}`}
            placeholder="e.g. Stephen King"
          />
        </div>

        <div className="relative">
          <label htmlFor="email" style={{ color: 'hsl(213, 96%, 18%)' }} className="block text-sm font-medium">
            Email Address
          </label>
          {errors.email && (
            <p style={{ color: '#7b1e1e' }} className="absolute right-0 top-0 text-xs font-medium">
              {errors.email.message}
            </p>
          )}
          <input
            type="email"
            id="email"
            {...register('email')}
            style={{
              borderColor: errors.email ? '#7b1e1e' : 'hsl(229, 24%, 87%)'
            }}
            className={`mt-1 block w-full rounded-md border p-2 focus:border-purplish-blue focus:ring-purplish-blue transition-colors ${errors.email ? 'border-[2px]' : ''}`}
            placeholder="e.g. stephenking@lorem.com"
          />
        </div>

        <div className="relative">
          <label htmlFor="phone" style={{ color: 'hsl(213, 96%, 18%)' }} className="block text-sm font-medium">
            Phone Number
          </label>
          {errors.phone && (
            <p style={{ color: '#7b1e1e' }} className="absolute right-0 top-0 text-xs font-medium">
              {errors.phone.message}
            </p>
          )}
          <input
            type="tel"
            id="phone"
            {...register('phone')}
            style={{
              borderColor: errors.phone ? '#7b1e1e' : 'hsl(229, 24%, 87%)'
            }}
            className={`mt-1 block w-full rounded-md border p-2 focus:border-purplish-blue focus:ring-purplish-blue transition-colors ${errors.phone ? 'border-[2px]' : ''}`}
            placeholder="e.g. +1 234 567 890"
          />
        </div>
      </div>

      <button ref={submitBtnRef} type="submit" className="hidden" tabIndex={-1} aria-hidden="true">Submit</button>

      <div className="hidden md:flex justify-end">
        <button
          type="submit"
          style={{ backgroundColor: 'hsl(213, 96%, 18%)' }}
          className="text-white px-4 py-2 rounded-md hover:bg-purplish-blue transition-colors"
        >
          Next Step
        </button>
      </div>
    </form>
  );
});

export default PersonalInfo; 