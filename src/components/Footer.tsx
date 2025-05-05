import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep, resetForm } from '../store/formSlice';
import { RootState } from '../store';

interface FooterProps {
  onNext: () => void;
  onConfirm: () => void;
}

const Footer = ({ onNext, onConfirm }: FooterProps) => {
  const dispatch = useDispatch();
  const { currentStep } = useSelector((state: RootState) => state.form);

  // Navigation handlers
  const handleBack = () => {
    if (currentStep === 2) dispatch(setCurrentStep(1));
    else if (currentStep === 3) dispatch(setCurrentStep(2));
    else if (currentStep === 4) dispatch(setCurrentStep(3));
  };

  // Button text and visibility
  let showBack = currentStep > 1 && currentStep < 5;
  let showNext = currentStep < 4;
  let showConfirm = currentStep === 4;

  return (
    <div className="fixed left-1/2 bottom-0 -translate-x-1/2 w-full max-w-md p-2 md:relative md:mt-8 bg-white md:bg-transparent">
      <div className="flex justify-between items-center rounded-lg p-2">
        {showBack ? (
          <button 
            onClick={handleBack}
            style={{ color: 'hsl(231, 11%, 63%)' }}
            className="font-medium hover:text-marine-blue transition-colors"
          >
            Go Back
          </button>
        ) : <div />}
        {showNext && (
          <button 
            onClick={onNext}
            style={{ backgroundColor: 'hsl(213, 96%, 18%)' }}
            className="text-white px-4 py-2 rounded-md hover:bg-purplish-blue transition-colors"
          >
            Next Step
          </button>
        )}
        {showConfirm && (
          <button 
            onClick={onConfirm}
            style={{ backgroundColor: 'hsl(243, 100%, 62%)' }}
            className="text-white px-4 py-2 rounded-md hover:bg-purplish-blue transition-colors"
          >
            Confirm
          </button>
        )}
      </div>
    </div>
  );
};

export default Footer; 