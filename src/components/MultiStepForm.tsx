import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep, resetForm } from '../store/formSlice';
import { RootState } from '../store';
import PersonalInfo from './steps/PersonalInfo';
import SelectPlan from './steps/SelectPlan';
import AddOns from './steps/AddOns';
import Summary from './steps/Summary';
import ThankYou from './steps/ThankYou';
import Footer from './Footer';
import { useRef } from 'react';
import Sidebar from './Sidebar';
import MobileLayout from './MobileLayout';

const MultiStepForm = () => {
  const dispatch = useDispatch();
  const { currentStep, personalInfo, plan, addOns } = useSelector((state: RootState) => state.form);
  const personalInfoRef = useRef<any>(null);
  const selectPlanRef = useRef<any>(null);

  const handleStepClick = (step: number) => {
    // Allow backward navigation without validation
    if (step < currentStep) {
      dispatch(setCurrentStep(step));
      return;
    }
 
    // Check if current step is valid
    const isStepValid = () => {
      switch (currentStep) {
        case 1:
          return personalInfo.name && personalInfo.email && personalInfo.phone;
        case 2:
          return plan?.type;
        case 3:
          return Object.values(addOns).some(value => value);
        case 4:
          return true;
        default:
          return false;
      }
    };

    // Allow forward navigation if current step is valid
    if (isStepValid()) {
      dispatch(setCurrentStep(step));
    }
  };

  const handleReset = () => {
    dispatch(resetForm());
  };

  const handleConfirm = () => {
    dispatch(setCurrentStep(5));
    // No reset here, so ThankYou stays until user interacts
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfo ref={personalInfoRef} />;
      case 2:
        return <SelectPlan ref={selectPlanRef} />;
      case 3:
        return <AddOns />;
      case 4:
        return <Summary onConfirm={handleReset} />;
      case 5:
        return <ThankYou />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row overflow-hidden md:bg-white md:rounded-lg md:shadow-lg">
      {/* Mobile Layout */}
      <MobileLayout
        currentStep={currentStep}
        handleStepClick={handleStepClick}
        onNext={() => {
          if (currentStep === 1) {
            window.dispatchEvent(new Event('personalInfoSubmit'));
          } else if (currentStep === 2 && selectPlanRef.current) {
            selectPlanRef.current.submit();
          } else {
            handleStepClick(currentStep + 1);
          }
        }}
        onConfirm={handleConfirm}
      >
        {renderStep()}
      </MobileLayout>
      {/* Desktop Layout */}
      <Sidebar currentStep={currentStep} handleStepClick={handleStepClick} />
      <div className="hidden md:block md:w-2/3 p-8 relative z-20 md:min-h-[568px] md:space-y-10">
        {renderStep()}
      </div>
    </div>
  );
};

export default MultiStepForm; 