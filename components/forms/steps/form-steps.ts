import Step1 from './step-1'
import Step10 from './step-10'
import Step11 from './step-11'
import Step12 from './step-12'
import Step13 from './step-13'
import Step14 from './step-14'
import Step15 from './step-15'
import Step16 from './step-16'
import Step17 from './step-17'
import Step18 from './step-18'
import Step19 from './step-19'
import Step2 from './step-2'
import Step3 from './step-3'
import Step4 from './step-4'
import Step5 from './step-5'
import Step6 from './step-6'
import Step7 from './step-7'
import Step8 from './step-8'
import Step9 from './step-9'
export const formSteps = {
	'step-1': Step1,
	'step-2': Step2,
	'step-3': Step3,
	'step-4': Step4,
	'step-5': Step5,
	'step-6': Step6,
	'step-7': Step7,
	'step-8': Step8,
	'step-9': Step9,
	'step-10': Step10,
	'step-11': Step11,
	'step-12': Step12,
	'step-13': Step13,
	'step-14': Step14,
	'step-15': Step15,
	'step-16': Step16,
	'step-17': Step17,
	'step-18': Step18,
	'step-19': Step19
} as const
export const stepExists = (x: string): x is FormStepType => x in formSteps
export type FormStepType = keyof typeof formSteps
