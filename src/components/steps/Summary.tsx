import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep } from '../../store/formSlice';
import { RootState } from '../../store';

interface SummaryProps {
  onConfirm: () => void;
}

interface Plan {
  type: 'arcade' | 'advanced' | 'pro';
  billing: 'monthly' | 'yearly';
  monthlyPrice: number;
  yearlyPrice: number;
}

const plans: Record<string, Plan> = {
  arcade: {
    type: 'arcade',
    billing: 'monthly',
    monthlyPrice: 9,
    yearlyPrice: 90,
  },
  advanced: {
    type: 'advanced',
    billing: 'monthly',
    monthlyPrice: 12,
    yearlyPrice: 120,
  },
  pro: {
    type: 'pro',
    billing: 'monthly',
    monthlyPrice: 15,
    yearlyPrice: 150,
  },
};

const addOnsList = [
  {
    id: 'online-service',
    name: 'Online service',
    monthlyPrice: 1,
    yearlyPrice: 10,
  },
  {
    id: 'larger-storage',
    name: 'Larger storage',
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
  {
    id: 'customizable-profile',
    name: 'Customizable profile',
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
];

const Summary = ({ onConfirm }: SummaryProps) => {
  const dispatch = useDispatch();
  const { plan, addOns } = useSelector((state: RootState) => state.form);
  const isYearly = plan?.billing === 'yearly';
  const selectedPlan = plan ? plans[plan.type] : null;

  const handleBack = () => {
    dispatch(setCurrentStep(3));
  };

  const handleConfirm = () => {
    onConfirm();
    dispatch(setCurrentStep(5));
  };

  const calculateTotal = () => {
    let total = 0;
    if (selectedPlan) {
      total += isYearly ? selectedPlan.yearlyPrice : selectedPlan.monthlyPrice;
    }
    Object.entries(addOns).forEach(([key, value]) => {
      if (value) {
        const addOn = addOnsList.find(a => a.id === key);
        if (addOn) {
          total += isYearly ? addOn.yearlyPrice : addOn.monthlyPrice;
        }
      }
    });
    return total;
  };

  return (
    <form className="space-y-12 md:py-12">
      <div>
        <h1 style={{ color: 'hsl(213, 96%, 18%)' }} className="text-2xl font-bold">
          Finishing up
        </h1>
        <p style={{ color: 'hsl(231, 11%, 63%)' }} className="mt-2">
          Double-check everything looks OK before confirming.
        </p>
      </div>
      <div className="space-y-8">
        <div className="bg-magnolia p-4 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 style={{ color: 'hsl(213, 96%, 18%)' }} className="font-medium">
                {selectedPlan?.type} ({isYearly ? 'Yearly' : 'Monthly'})
              </h2>
              <button
                onClick={() => dispatch(setCurrentStep(2))}
                style={{ color: 'hsl(231, 11%, 63%)' }}
                className="text-sm underline hover:text-marine-blue transition-colors cursor-pointer"
              >
                Change
              </button>
            </div>
            <span style={{ color: 'hsl(213, 96%, 18%)' }} className="font-bold">
              ${isYearly ? selectedPlan?.yearlyPrice : selectedPlan?.monthlyPrice}/{isYearly ? 'yr' : 'mo'}
            </span>
          </div>

          <div className="border-t pt-4 space-y-3">
            {Object.entries(addOns).map(([key, value]) => {
              if (value) {
                const addOn = addOnsList.find(a => a.id === key);
                if (addOn) {
                  return (
                    <div key={key} className="flex justify-between">
                      <span style={{ color: 'hsl(231, 11%, 63%)' }}>{addOn.name}</span>
                      <span style={{ color: 'hsl(213, 96%, 18%)' }}>
                        +${isYearly ? addOn.yearlyPrice : addOn.monthlyPrice}/{isYearly ? 'yr' : 'mo'}
                      </span>
                    </div>
                  );
                }
              }
              return null;
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span style={{ color: 'hsl(213, 96%, 18%)' }} className="font-medium">
          Total:
        </span>
        <span style={{ color: 'hsl(213, 96%, 18%)' }} className="font-bold">
          ${calculateTotal()}/{isYearly ? 'yr' : 'mo'}
        </span>
      </div>
      <div className="hidden md:flex justify-between">
        <button
          onClick={handleBack}
          style={{ color: 'hsl(231, 11%, 63%)' }}
          className="font-medium hover:text-marine-blue transition-colors cursor-pointer"
        >
          Go Back
        </button>
        <button
          onClick={handleConfirm}
          style={{ backgroundColor: 'hsl(243, 100%, 62%)' }}
          className="text-white px-4 py-2 rounded-md hover:bg-purplish-blue transition-colors cursor-pointer"
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Summary; 