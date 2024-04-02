import { useEffect, useState } from 'react'

import Container from 'components/container'
import FormContainer from 'components/forms/form-container'
import Image from 'next/image' // Import the Image component from next/image
import { AmericanExpress, Discovery, Mastercard, Visa } from 'public/images/CreditCards'
import useFormStore from 'store/useFormStore'
import { BrandEnum } from 'utils/enums'

const PaymentForm = () => {
	const { formStore } = useFormStore()
	const [cardNumber, setCardNumber] = useState('')
	const [expiryDate, setExpiryDate] = useState('')
	const [isExpireDateError, setIsExpireDateError] = useState<boolean>(false)
	const [isCardNumberError, setIsCardNumberError] = useState<boolean>(false)
	const [cvc, setCvc] = useState('')

	const formatCardNumber = (input: string) => {
		const formatted = input
			.replace(/\s?/g, '')
			.replace(/(\d{4})/g, '$1 ')
			.trim()

		return formatted
	}

	useEffect(() => {
		if (expiryDate.slice(0, 2).length + expiryDate.slice(3, 5).length === 4) {
			setIsExpireDateError(validateDate(expiryDate))
		} else {
			setIsExpireDateError(false)
		}
	}, [expiryDate])

	useEffect(() => {
		if (cardNumber.length === 16) {
			setIsCardNumberError(validateCreditCardNumber(cardNumber))
		} else {
			setIsCardNumberError(false)
		}
	}, [cardNumber])
	const handleCardNumberChange = (input: string) => {
		const value = input.replace(/\D/g, '')
		if (value.length <= 16) {
			setCardNumber(value)
			formStore.card_number = value
		}
	}

	const handleExpireDateChange = (input: string) => {
		if (input.length <= 5) {
			setExpiryDate(input)
			formStore.expiry_date = input
		}
	}
	const handleCvcChange = (input: string) => {
		if (input.length <= 3) {
			setCvc(input)
			formStore.cvc = input
		}
	}

	const validateCreditCardNumber = (number: string): boolean => {
		const cleanNumber = number.replace(/\s+/g, '')

		if (!/^\d{13,19}$/.test(cleanNumber)) {
			return false
		}

		let sum = 0
		let double = false

		for (let i = cleanNumber.length - 1; i >= 0; i--) {
			let digit = parseInt(cleanNumber.charAt(i), 10)

			if (double) {
				digit *= 2
				if (digit > 9) {
					digit -= 9
				}
			}

			sum += digit
			double = !double
		}

		return !(sum % 10 === 0)
	}

	const validateDate = (input: string) => {
		const dateParts = input.split('/')
		const dateInput = new Date(Number(`20${dateParts[1]}`), Number(dateParts[0]) - 1)

		const currentDate = new Date()
		if (
			dateInput.getFullYear() < currentDate.getFullYear() ||
			(dateInput.getFullYear() === currentDate.getFullYear() &&
				dateInput.getMonth() < currentDate.getMonth())
		) {
			return true
		} else {
			return false
		}
	}

	const generateValue = (num: number) => {
		let newValue = ''
		if (num > 12 && num < 20) {
			newValue = '0' + num.toString().slice(1, 2)
		} else {
			newValue = '0' + num.toString().slice(0, 1)
		}

		return newValue
	}

	const formatCvc = (input: string) => {
		const formatted = input.replace(/[^0-9]/g, '').slice(0, 3)

		return formatted
	}
	const formatExpiryDate = (input: string) => {
		let formatted = input.replace(/[^0-9]/g, '')
		if (formatted.length >= 2) {
			const month = parseInt(formatted.slice(0, 2), 10)
			if (month < 1) {
				formatted = '01'
			} else if (month > 12) {
				formatted = generateValue(month)
			} else {
				formatted = formatted.slice(0, 2) + '/' + formatted.slice(2, 4)
			}
		}

		return formatted
	}

	const getCardCompany = (number: string): string => {
		const cleanedNumber = number.replace(/\s/g, '')
		const firstSixDigits = parseInt(cleanedNumber.slice(0, 6), 10)

		if (firstSixDigits >= 400000 && firstSixDigits <= 499999) {
			return BrandEnum.visa
		} else if (firstSixDigits >= 510000 && firstSixDigits <= 559999) {
			return BrandEnum.masterCard
		} else if (
			(firstSixDigits >= 340000 && firstSixDigits <= 349999) ||
			(firstSixDigits >= 370000 && firstSixDigits <= 379999)
		) {
			return BrandEnum.amex
		} else if (
			(firstSixDigits >= 601100 && firstSixDigits <= 601199) ||
			(firstSixDigits >= 622126 && firstSixDigits <= 622925)
		) {
			return BrandEnum.discover
		} else if (
			(firstSixDigits >= 300000 && firstSixDigits <= 305999) ||
			(firstSixDigits >= 309500 && firstSixDigits <= 309599) ||
			(firstSixDigits >= 360000 && firstSixDigits <= 369999)
		) {
			return BrandEnum.diners
		} else if (firstSixDigits >= 352800 && firstSixDigits <= 358999) {
			return BrandEnum.jcb
		} else if (firstSixDigits >= 620000 && firstSixDigits <= 629999) {
			return BrandEnum.unionPay
		} else {
			return BrandEnum.unknown
		}
	}

	return (
		<Container>
			<div className="justify-center gap-10 pb-10 md:flex">
				<div className="max-w-[580px] flex-1">
					<FormContainer wide>
						<div className="py-3">
							<div className="flex justify-between">
								<label htmlFor={'cardNumber'} className="block leading-6">
									Card Number*
								</label>
								<div className="flex gap-2">
									<Image
										className={`${
											getCardCompany(cardNumber) === BrandEnum.amex
												? 'opacity-100'
												: 'opacity-50'
										}`}
										alt="AmericanExpress"
										src={AmericanExpress}
									/>

									<Image
										className={`${
											getCardCompany(cardNumber) === BrandEnum.masterCard
												? 'opacity-100'
												: 'opacity-50'
										}`}
										alt="Mastercard"
										src={Mastercard}
									/>
									<Image
										className={`${
											getCardCompany(cardNumber) === BrandEnum.visa
												? 'opacity-100'
												: 'opacity-50'
										}`}
										alt="Visa"
										src={Visa}
									/>
									<Image
										className={`${
											getCardCompany(cardNumber) === BrandEnum.discover
												? 'opacity-100'
												: 'opacity-50'
										}`}
										alt="Discovery"
										src={Discovery}
									/>
								</div>
							</div>
							<div className="mt-2">
								{' '}
								<input
									required
									className={`${
										isCardNumberError ? 'text-red-700' : 'text-gray-700'
									} block w-full rounded-full border-0 px-6  shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-light-blue sm:leading-6`}
									id="card_number"
									type="text"
									defaultValue={formStore.card_number as string}
									placeholder="1234 1234 1234 1234"
									value={formatCardNumber(cardNumber)}
									onChange={(e) => {
										handleCardNumberChange(e.target.value)
										getCardCompany(e.target.value)
									}}
								/>
							</div>
						</div>

						<div className="gap-4 lg:grid lg:grid-cols-2">
							<div className="py-3">
								<label htmlFor={'expiryDate'} className="block leading-6">
									Expiry Date*
								</label>
								<div className="mt-2">
									<input
										required
										className={`${
											isExpireDateError ? 'text-red-700' : 'text-gray-700'
										} block w-full rounded-full border-0 px-6 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-light-blue sm:leading-6`}
										id="expiry_date"
										type="text"
										defaultValue={formStore.expiry_date as string}
										placeholder="MM/YY"
										value={formatExpiryDate(expiryDate)}
										onChange={(e) => handleExpireDateChange(e.target.value)}
									/>
								</div>
							</div>

							<div className="py-3">
								<label htmlFor={'cvc'} className="block leading-6">
									CVC*
								</label>
								<div className="mt-2">
									<input
										required
										className={`block w-full rounded-full border-0 px-6 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-light-blue sm:leading-6`}
										id="cvc"
										type="text"
										defaultValue={formStore.cvc as string}
										placeholder="CVC"
										value={formatCvc(cvc)}
										onChange={(e) => handleCvcChange(e.target.value)}
									/>
								</div>
							</div>
						</div>
					</FormContainer>
				</div>
			</div>
		</Container>
	)
}

export default PaymentForm
