import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePlan, setCurrentStep } from '../../store/formSlice';
import { RootState } from '../../store';

const plans = [
  {
    id: 'arcade',
    name: 'Arcade',
    monthlyPrice: 9,
    yearlyPrice: 90,
    icon: '/images/icon-arcade.svg',
  },
  {
    id: 'advanced',
    name: 'Advanced',
    monthlyPrice: 12,
    yearlyPrice: 120,
    icon: '/images/icon-advanced.svg',
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 15,
    yearlyPrice: 150,
    icon: '/images/icon-pro.svg',
  },
];

const SelectPlan = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { plan } = useSelector((state: RootState) => state.form);
  const [isYearly, setIsYearly] = useState(plan?.billing === 'yearly');

  // Update isYearly state when plan changes
  useEffect(() => {
    if (plan?.billing) {
      setIsYearly(plan.billing === 'yearly');
    }
  }, [plan?.billing]);

  const handlePlanSelect = (planId: string) => {
    dispatch(
      updatePlan({
        type: planId as 'arcade' | 'advanced' | 'pro',
        billing: isYearly ? 'yearly' : 'monthly',
      })
    );
  };

  const handleToggleChange = () => {
    const newIsYearly = !isYearly;
    setIsYearly(newIsYearly);
    // Update the plan with the new billing cycle if a plan is already selected
    if (plan?.type) {
      dispatch(
        updatePlan({
          type: plan.type,
          billing: newIsYearly ? 'yearly' : 'monthly',
        })
      );
    }
  };

  const handleNext = () => {
    if (!plan?.type) {
      return;
    }
    dispatch(setCurrentStep(3));
  };

  const handleBack = () => {
    dispatch(setCurrentStep(1));
  };

  useImperativeHandle(ref, () => ({
    submit: handleNext,
  }));

  return (
    <form className="space-y-12 md:py-12">
      <div>
        <h1 style={{ color: 'hsl(213, 96%, 18%)' }} className="text-2xl font-bold">
          Select your plan
        </h1>
        <p style={{ color: 'hsl(231, 11%, 63%)' }} className="mt-2">
          You have the option of monthly or yearly billing.
        </p>
      </div>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((planItem) => (
            <button
              type="button"
              key={planItem.id}
              onClick={() => handlePlanSelect(planItem.id)}
              style={{
                borderColor: plan?.type === planItem.id ? 'hsl(243, 100%, 62%)' : 'hsl(229, 24%, 87%)',
                backgroundColor: plan?.type === planItem.id ? 'hsl(217, 100%, 97%)' : 'transparent',
              }}
              className={`flex flex-col items-start p-4 border rounded-lg transition-colors cursor-pointer
                ${plan?.type === planItem.id ? 'border-purplish-blue' : 'border'}
                hover:border-purplish-blue focus:border-purplish-blue`}
            >
              <img src={planItem.icon} alt={planItem.name} className="mb-8" />
              <span style={{ color: 'hsl(213, 96%, 18%)' }} className="font-medium">
                {planItem.name}
              </span>
              <span style={{ color: 'hsl(231, 11%, 63%)' }} className="text-sm">
                ${isYearly ? planItem.yearlyPrice : planItem.monthlyPrice}/{isYearly ? 'yr' : 'mo'}
              </span>
              {isYearly && (
                <span style={{ color: 'hsl(213, 96%, 18%)' }} className="text-sm mt-1">
                  2 months free
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center p-4 bg-magnolia rounded-lg">
          <span
            style={{ color: isYearly ? 'hsl(231, 11%, 63%)' : 'hsl(213, 96%, 18%)' }}
            className="font-medium text-sm"
          >
            Monthly
          </span>
          <button
            type="button"
            onClick={handleToggleChange}
            style={{ 
              backgroundColor: isYearly ? 'hsl(213, 96%, 18%)' : 'hsl(213, 96%, 18%)',
              transition: 'background-color 0.3s ease'
            }}
            className="mx-4 w-12 h-6 rounded-full relative cursor-pointer"
          >
            <div
              style={{
                transition: 'transform 0.3s ease, background-color 0.3s ease',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}
              className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white ${
                isYearly ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
          <span
            style={{ color: isYearly ? 'hsl(213, 96%, 18%)' : 'hsl(231, 11%, 63%)' }}
            className="font-medium text-sm"
          >
            Yearly
          </span>
        </div>
      </div>
      <div className="hidden md:flex justify-between">
        <button
          type="button"
          onClick={handleBack}
          style={{ color: 'hsl(231, 11%, 63%)' }}
          className="font-medium hover:text-marine-blue transition-colors cursor-pointer"
        >
          Go Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          style={{ backgroundColor: 'hsl(213, 96%, 18%)' }}
          className="text-white px-4 py-2 rounded-md hover:bg-purplish-blue transition-colors cursor-pointer"
        >
          Next Step
        </button>
      </div>
    </form>
  );
});

export default SelectPlan; 