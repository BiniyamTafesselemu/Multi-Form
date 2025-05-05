import { useDispatch, useSelector } from 'react-redux';
import { updateAddOns, setCurrentStep } from '../../store/formSlice';
import { RootState } from '../../store';
import { useState } from 'react';

interface AddOn {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
}

const addOns: AddOn[] = [
  {
    id: 'online-service',
    name: 'Online service',
    description: 'Access to multiplayer games',
    monthlyPrice: 1,
    yearlyPrice: 10,
  },
  {
    id: 'larger-storage',
    name: 'Larger storage',
    description: 'Extra 1TB of cloud save',
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
  {
    id: 'customizable-profile',
    name: 'Customizable profile',
    description: 'Custom theme on your profile',
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
];

const AddOns = () => {
  const dispatch = useDispatch();
  const { addOns: selectedAddOns, plan } = useSelector((state: RootState) => state.form);
  const isYearly = plan?.billing === 'yearly';
  const [error, setError] = useState('');

  const handleAddOnToggle = (addOnId: string) => {
    setError('');
    const isSelected = selectedAddOns[addOnId as keyof typeof selectedAddOns];
    dispatch(
      updateAddOns({
        ...selectedAddOns,
        [addOnId]: !isSelected,
      })
    );
  };

  const handleNext = () => {
    const hasSelectedAddOn = Object.values(selectedAddOns).some(value => value);
    if (!hasSelectedAddOn) {
      setError('Please select at least one add-on');
      return;
    }
    dispatch(setCurrentStep(4));
  };

  const handleBack = () => {
    dispatch(setCurrentStep(2));
  };

  return (
    <form className="space-y-12 md:py-12">
      <div>
        <h1 style={{ color: 'hsl(213, 96%, 18%)' }} className="text-2xl font-bold">
          Pick add-ons
        </h1>
        <p style={{ color: 'hsl(231, 11%, 63%)' }} className="mt-2">
          Add-ons help enhance your gaming experience.
        </p>
      </div>
      <div className="space-y-8">
        {addOns.map((addOn) => {
          const isSelected = selectedAddOns[addOn.id as keyof typeof selectedAddOns];
          return (
            <label
              key={addOn.id}
              style={{
                borderColor: isSelected ? 'hsl(243, 100%, 62%)' : 'hsl(229, 24%, 87%)',
                backgroundColor: isSelected ? 'hsl(217, 100%, 97%)' : 'transparent',
              }}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors
                ${isSelected ? 'border-purplish-blue' : 'border'}
                hover:border-purplish-blue focus-within:border-purplish-blue`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleAddOnToggle(addOn.id)}
                className="w-5 h-5 rounded border-light-gray text-purplish-blue focus:ring-purplish-blue cursor-pointer"
              />
              <div className="ml-4 flex-grow">
                <h3 style={{ color: 'hsl(213, 96%, 18%)' }} className="font-medium">
                  {addOn.name}
                </h3>
                <p style={{ color: 'hsl(231, 11%, 63%)' }} className="text-sm">
                  {addOn.description}
                </p>
              </div>
              <span style={{ color: 'hsl(243, 100%, 62%)' }} className="text-sm">
                +${isYearly ? addOn.yearlyPrice : addOn.monthlyPrice}/{isYearly ? 'yr' : 'mo'}
              </span>
            </label>
          );
        })}
      </div>
      {error && (
        <p style={{ color: 'hsl(354, 84%, 57%)' }} className="text-sm">
          {error}
        </p>
      )}
      <div className="hidden md:flex justify-between">
        <button
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
};

export default AddOns; 