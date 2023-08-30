import React from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';

type FormStepperProps = {
  activeStep: number;
};

export default function FormStepper({ activeStep }: FormStepperProps) {

  const steps = [
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

  return (
    <div aria-label="Progress" className="pt-9 pb-7">
      <div className="divide-y divide-gray-300 px-6 py-3 rounded-full bg-gray-200 bg-opacity-20 border border-gray-300 items-center md:flex md:divide-y-0">
        {steps.map((step, stepIdx) => (
          <React.Fragment key={step.name}>
            <div className="md:flex">
              {step.status === 'complete' ? (
                <a href={step.href} className="group flex items-center">
                  <span className="flex items-center px-6 text-sm font-medium">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent-green-800 group-hover:bg-main-light-blue">
                      <CheckIcon className="h-4 w-4 text-white" aria-hidden="true" />
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-900 shrink-0">{step.name}</span>
                  </span>
                </a>
              ) : step.status === 'current' ? (
                <a href={step.href} className="flex items-center px-6 text-sm font-medium" aria-current="step">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-main-light-blue">
                    <span className="text-white text-sm">{step.id}</span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-main-light-blue shrink-0">{step.name}</span>
                </a>
              ) : (
                <a href={step.href} className="group flex items-center">
                  <span className="flex items-center px-6 text-sm font-medium">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-600">
                      <span className="text-white text-sm">{step.id}</span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-600 shrink-0">{step.name}</span>
                  </span>
                </a>
              )}
            </div>
            {stepIdx !== steps.length - 1 ? (
              <hr className=" flex-1 h-0.5 bg-gray-100" />
            ) : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}