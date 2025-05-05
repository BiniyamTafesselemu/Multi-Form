import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const MobileLayout = ({
  currentStep,
  handleStepClick,
  onNext,
  onConfirm,
  children,
}: {
  currentStep: number;
  handleStepClick: (step: number) => void;
  onNext: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
}) => (
  <div className="md:hidden w-full min-h-screen flex flex-col items-center relative overflow-hidden bg-[#f0f6ff]">
    <div className="fixed top-0 left-0 w-full z-0">
      <Navbar currentStep={currentStep} handleStepClick={handleStepClick} />
    </div>
    <div className="h-[172px] w-full" />
    <div className="fixed left-1/2 top-[132px] -translate-x-1/2 w-full flex justify-center z-20">
      <div className="bg-white rounded-lg shadow-lg p-3 w-full max-w-xs overflow-y-auto max-h-[calc(100vh-250px)]">
        {children}
      </div>
    </div>
    <div className="fixed left-1/2 bottom-0 w-full max-w-sm -translate-x-1/2 px-4 z-30">
      <Footer onNext={onNext} onConfirm={onConfirm} />
    </div>
  </div>
);

export default MobileLayout; 