import { CheckIcon } from '@heroicons/react/24/solid';

const steps = [
  { id: '1', name: 'Job details', href: '#', status: 'complete' },
  { id: '2', name: 'Application form', href: '#', status: 'current' },
  { id: '3', name: 'Preview', href: '#', status: 'upcoming' },
  { id: '4', name: 'Preview', href: '#', status: 'upcoming' },
];

export default function FormStepper() {
  return (
    <div aria-label="Progress" className="pt-9 pb-7">
      <div className="divide-y divide-gray-300 px-6 py-3 rounded-full bg-gray-200 bg-opacity-20 border border-gray-300 md:flex md:divide-y-0">
        {steps.map((step, stepIdx) => (
          <>
          <div key={step.name} className="relative md:flex md:flex-1">
            {step.status === 'complete' ? (
              <a href={step.href} className="group flex items-center">
                <span className="flex items-center px-6 text-sm font-medium">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-main-light-blue group-hover:bg-main-light-blue">
                    <CheckIcon className="h-4 w-4 text-white" aria-hidden="true" />
                  </span>
                  <span className="ml-4 text-sm font-medium text-gray-900 shrink-0">{step.name}</span>
                </span>
              </a>
            ) : step.status === 'current' ? (
              <a href={step.href} className="flex items-center px-6 text-sm font-medium" aria-current="step">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-600">
                  <span className="text-white text-sm">{step.id}</span>
                </span>
                <span className="ml-4 text-sm font-medium text-gray-600 shrink-0">{step.name}</span>
              </a>
            ) : (
              <a href={step.href} className="group flex items-center">
                <span className="flex items-center px-6 text-sm font-medium">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-600">
                    <span className="text-white text-sm">{step.id}</span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-gray-600 shrink-0 group-hover:text-gray-900">{step.name}</span>
                </span>
              </a>
            )}
          </div>
            {stepIdx !== steps.length - 1 ? (
              <hr className="border-b-2 flex-1 h-1/2 border-gray-100" />
            ) : null}
         </>
        ))}
        
      </div>
    </div>
  );
}