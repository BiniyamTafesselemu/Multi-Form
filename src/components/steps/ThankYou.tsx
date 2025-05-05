import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentStep } from '../../store/formSlice';

const ThankYou = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setCurrentStep(1));
    }, 5000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <img src="/images/icon-thank-you.svg" alt="Thank you" className="mb-6" />
      <h1 style={{ color: 'hsl(213, 96%, 18%)' }} className="text-2xl font-bold mb-2">
        Thank you!
      </h1>
      <p style={{ color: 'hsl(231, 11%, 63%)' }} className="max-w-md">
        Thanks for confirming your subscription! We hope you have fun using our platform. If you ever
        need support, please feel free to email us at support@loremgaming.com.
      </p>
    </div>
  );
};

export default ThankYou; 