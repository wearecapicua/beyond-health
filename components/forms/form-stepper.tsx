import React, { useEffect, useState } from 'react'

import { CheckIcon } from '@heroicons/react/24/solid'
import useWindowSize from 'utils/useWindowSize'

type FormStepperProps = {
	activeStep: number
}

type Step = {
	id: string
	name: string
	href: string
	// FIXME: Change this to enum
	status: string // 'complete' | 'current' | 'hidden' | 'upcoming'
}

const FormStepper = ({ activeStep }: FormStepperProps) => {
	const [steps, setSteps] = useState<Step[]>([])
	const windowSize = useWindowSize()

	const isMobile = (windowSize as number) < 780

	useEffect(() => {
		const steps = isMobile ? mobileSteps : desktopSteps
		setSteps(steps)
	}, [windowSize])

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
		}
	]

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
			status: activeStep <= 5 || activeStep > 12 ? 'hidden' : activeStep >= 10 ? 'current' : 'upcoming'
		},
		{
			id: '4',
			name: 'Checkout',
			href: '#',
			status: activeStep < 10 ? 'hidden' : activeStep >= 10 && activeStep <= 12 ? 'upcoming' : 'current'
		}
	]

	return (
		<div aria-label="Progress" className="pb-7 pt-9">
			<div className="mx-6 flex items-center gap-3 rounded-full border border-gray-300 bg-gray-200 bg-opacity-20 p-3 sm:mx-0 md:divide-y-0 md:px-6">
				{steps.map((step, stepIdx) => (
					<React.Fragment key={step.name}>
						<>
							{step.status === 'complete' ? (
								<a href={step.href} className="group flex w-full flex-1 items-center">
									<span className="flex w-full items-center  gap-3 text-sm font-medium md:px-6">
										<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-green-800 group-hover:bg-main-light-blue">
											<CheckIcon className="h-4 w-4 text-white" aria-hidden="true" />
										</span>
										{!isMobile && (
											<span className="ml-4 shrink-0 text-[13px] font-medium text-gray-900 sm:text-sm">
												{step.name}
											</span>
										)}
										{isMobile && <div className="h-0.5 w-full bg-gray-100" />}
									</span>
								</a>
							) : step.status === 'current' ? (
								<a
									href={step.href}
									className="flex flex-1 items-center gap-3 text-sm font-medium last-of-type:flex-initial md:px-6"
									aria-current="step"
								>
									<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-main-light-blue">
										<span className="text-sm text-white">{step.id}</span>
									</span>
									<span className="shrink-0 text-[13px] font-medium text-main-light-blue sm:text-sm md:ml-4">
										{step.name}
									</span>
									{isMobile && <div className="h-0.5 w-full bg-gray-100" />}
								</a>
							) : step.status === 'hidden' ? null : (
								<a href={step.href} className="group flex items-center">
									<span className="flex items-center text-sm font-medium md:px-6">
										<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-600">
											<span className="text-sm text-white">{step.id}</span>
										</span>
										{!isMobile && (
											<span className="ml-4 shrink-0 text-[13px] font-medium text-gray-600 sm:text-sm">
												{step.name}
											</span>
										)}
									</span>
								</a>
							)}
						</>
						{!isMobile && stepIdx !== steps.length - 1 ? (
							<hr className=" h-0.5 flex-1 bg-gray-100" />
						) : null}
					</React.Fragment>
				))}
			</div>
		</div>
	)
}

export default FormStepper
