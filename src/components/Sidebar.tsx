
const steps = [
  { step: 1, label: 'YOUR INFO' },
  { step: 2, label: 'SELECT PLAN' },
  { step: 3, label: 'ADD-ONS' },
  { step: 4, label: 'SUMMARY' },
];

interface SidebarProps {
  currentStep: number;
  handleStepClick: (step: number) => void;
}

const Sidebar = ({ currentStep, handleStepClick }: SidebarProps) => (
  <div
    style={{
      backgroundImage: "url(/images/bg-sidebar-desktop.svg)",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '568px',
    }}
    className="hidden md:block md:w-1/3 p-8 my-4 mx-6 rounded-lg"
  >
    <div className="flex flex-col gap-8">
      {steps.map(({ step, label }) => (
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
          <div>
            <p style={{ color: 'hsl(229, 24%, 87%)' }} className="text-sm">
              STEP {step}
            </p>
            <p style={{ color: 'white' }} className="font-medium">
              {label}
            </p>
          </div>
        </button>
      ))}
    </div>
  </div>
);

export default Sidebar; 