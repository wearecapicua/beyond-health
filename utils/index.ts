import { FormStepType } from 'components/forms/steps/form-steps'

import { fieldMap } from './field-map'

export const incrementString = (inputString: string) => {
	const parts = inputString.split('-')
	const prefix = parts[0]
	const currentNumber = parseInt(parts[1])

	if (isNaN(currentNumber)) {
		throw new Error('Invalid input string format')
	}

	const nextNumber = currentNumber + 1
	const nextString = `${prefix}-${nextNumber}`

	return nextString as FormStepType
}

export const decrementString = (inputString: string) => {
	const parts = inputString.split('-')
	const prefix = parts[0]
	const currentNumber = parseInt(parts[1])

	if (isNaN(currentNumber)) {
		throw new Error('Invalid input string format')
	}

	const nextNumber = currentNumber - 1
	const nextString = `${prefix}-${nextNumber}`

	return nextString as FormStepType
}

export function getNullFieldsAndMap(objectToFilter: Record<string, unknown>) {
	const missingFieldsMap: Record<string, unknown> = {}

	for (const key in fieldMap) {
		if (objectToFilter[key] === null || objectToFilter[key] === undefined) {
			missingFieldsMap[key] = fieldMap[key as keyof typeof fieldMap]
		}
	}

	const valuesArray: number[] = Object.values(missingFieldsMap) as number[]

	valuesArray.sort((a, b) => a - b)
	const filteredArray = valuesArray.filter((value) => value !== undefined)
	const step = filteredArray.length ? `step-${filteredArray[0]}` : null

	return step
}

export function generateOrderNumber() {
	const min = 10000 // Minimum 5-digit number
	const max = 99999 // Maximum 5-digit number

	const orderNumber = Math.floor(Math.random() * (max - min + 1)) + min

	return orderNumber.toString() // Convert to string
}
