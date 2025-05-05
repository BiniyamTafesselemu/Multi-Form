
const steps = [
  { step: 1 },
  { step: 2 },
  { step: 3 },
  { step: 4 },
];

interface NavbarProps {
  currentStep: number;
  handleStepClick: (step: number) => void;
}

const Navbar = ({ currentStep, handleStepClick }: NavbarProps) => (
  <div
    style={{
      backgroundImage: "url(/images/bg-sidebar-mobile.svg)",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '172px',
    }}
    className="md:hidden w-full p-8 rounded-lg"
  >
    <div className="flex justify-center gap-4">
      {steps.map(({ step }) => (
        <button
          key={step}
          onClick={() => handleStepClick(step)}
          className="flex items-center gap-4 cursor-pointer"
        >
          <div
            style={{
              borderColor: currentStep === step ? 'hsl(206, 94%, 87%)' : 'white',
              backgroundColor: currentStep === step ? 'hsl(206, 94%, 87%)' : 'transparent',
            }}
            className="w-8 h-8 rounded-full border flex items-center justify-center"
          >
            <span
              style={{ color: currentStep === step ? 'hsl(213, 96%, 18%)' : 'white' }}
              className="font-bold"
            >
              {step}
            </span>
          </div>
        </button>
      ))}
    </div>
  </div>
);

export default Navbar; 