import React, { useState, useEffect } from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';
import useWindowSize from 'utils/useWindowSize';

type FormStepperProps = {
  activeStep: number;
};
type Step = {
  id: string;
  name: string;
  href: string;
  status: 'complete' | 'current' | 'hidden' | 'upcoming';
};

export default function FormStepper({ activeStep }: FormStepperProps) {
  const [steps, setSteps] = useState<Step[]>([]);
  const windowSize = useWindowSize();

  /* @ts-ignore */
  const isMobile = windowSize < 780

  useEffect(() => {
    const steps = isMobile ? mobileSteps : desktopSteps;
    /* @ts-ignore */
    setSteps(steps)
  }, [windowSize]);

  const desktopSteps = [
    { 
      id: '1', 
      name: 'Profile Questions',
      href: '#',
      status: activeStep <= 5 ? 'current' : 'complete'
    },
    { 
      id: '2',
      name: 'Medical History',
      href: '#',
      status: activeStep >= 6 && activeStep <= 9 ? 'current' : activeStep > 6 ? 'complete' : 'upcoming'
    },
    { 
      id: '3',
      name: 'Treatment',
      href: '#',
      status: activeStep >= 10 && activeStep <= 12 ? 'current' : activeStep > 10 ? 'complete' : 'upcoming'
    },
    { 
      id: '4',
      name: 'Checkout',
      href: '#',
      status: activeStep > 12 ? 'current' : 'upcoming'
    },
  ];

  const mobileSteps = [
    { 
      id: '1', 
      name: 'Profile Questions',
      href: '#',
      status: activeStep <= 5 ? 'current' : 'complete'
    },
    { 
      id: '2',
      name: 'Medical History',
      href: '#',
      status: activeStep >= 6 && activeStep <= 9 ? 'current' : activeStep > 9 ? 'hidden' : 'upcoming'
    },
    { 
      id: '3',
      name: 'Treatment',
      href: '#',
      status: (activeStep <= 5 || activeStep > 12) ? 'hidden' : activeStep >= 10 ? 'current' : 'upcoming'
    },
    { 
      id: '4',
      name: 'Checkout',
      href: '#',
      status: activeStep < 10 ? 'hidden' : (activeStep >= 10 && activeStep <= 12) ? 'upcoming' : 'current'
    },
  ];

  return (
    <div aria-label="Progress" className="pt-9 pb-7">
      <div className="mx-6 md:mx-0 px-3 md:px-6 py-3 gap-3 rounded-full bg-gray-200 bg-opacity-20 border border-gray-300 items-center flex md:divide-y-0">
        {steps.map((step, stepIdx) => (
          <React.Fragment key={step.name}>
            <>
              {step.status === 'complete' ? (
                <a href={step.href} className="group flex-1 flex w-full items-center">
                  <span className="flex gap-3 items-center  md:px-6 text-sm font-medium w-full">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent-green-800 group-hover:bg-main-light-blue">
                      <CheckIcon className="h-4 w-4 text-white" aria-hidden="true" />
                    </span>
                    {!isMobile && <span className="ml-4 text-sm font-medium text-gray-900 shrink-0">{step.name}</span>}
                    {isMobile && <div className="w-full h-0.5 bg-gray-100" />}
                  </span>
                  
                </a>
              ) : step.status === 'current' ? (
                <a href={step.href} className="flex flex-1 last-of-type:flex-initial gap-3 items-center md:px-6 text-sm font-medium" aria-current="step">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-main-light-blue">
                    <span className="text-white text-sm">{step.id}</span>
                  </span>
                  <span className="md:ml-4 text-sm font-medium text-main-light-blue shrink-0">{step.name}</span>
                  {isMobile && <div className="w-full h-0.5 bg-gray-100" />}
                </a>
              ) : step.status === 'hidden' ?
              null :
              (
                <a href={step.href} className="group flex items-center">
                  <span className="flex items-center md:px-6 text-sm font-medium">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-600">
                      <span className="text-white text-sm">{step.id}</span>
                    </span>
                    {!isMobile && <span className="ml-4 text-sm font-medium text-gray-600 shrink-0">{step.name}</span>}
                  </span>
                </a>
              )}
            </>
            {!isMobile && stepIdx !== steps.length - 1 ? (
              <hr className=" flex-1 h-0.5 bg-gray-100" />
            ) : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}