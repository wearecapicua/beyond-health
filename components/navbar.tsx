import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { getProfileData } from 'lib/api/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useFormStatusStore } from 'store/useFormStatusStore'
import { useFormStore } from 'store/useFormStore'

import LoginButton from './login'

type NavbarProps = {
	fullPage: boolean | undefined
}

const Navbar = ({ fullPage }: NavbarProps) => {
	const session = useSession()
	const router = useRouter()
	const userLoggedIn = session.status === 'authenticated' && session.data?.user
	const adminLoggedIn = session.status === 'authenticated' && session.data?.user?.role === 'ADMIN'

	const { formStep } = useFormStatusStore()
	const { updateFormStore } = useFormStore()

	async function handleResume() {
		const profileData = await getProfileData()
		updateFormStore(profileData)

		router.push(`/form/${formStep}`)
	}
	async function handleStartNow() {
		const profileData = await getProfileData()

		if (userLoggedIn) {
			updateFormStore(profileData)
			router.push('/form/step-1')
		} else {
			router.push('/login')
		}
	}

	const isCurrentRoute = (route: string) => router.asPath === route

	const highlightStyles = 'border-b-2 border-main-light-blue text-main-blue'
	const regLinkStyles = 'border-transparent'

	return (
		<Disclosure as="nav" className="bg-white">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-wide p-6">
						<div className="flex justify-between">
							<div className="flex">
								<div className="flex shrink-0 items-center">
									<Link href="/">
										<Image
											src="/images/beyond_health_logo.png"
											alt="Beyond Health Logo"
											width="172"
											height="26"
										/>
									</Link>
								</div>
							</div>
							<div className="hidden sm:ml-6 sm:items-center sm:gap-8 md:flex">
								<div className="hidden sm:space-x-8 md:flex">
									<Link
										href="/faqs"
										className="inline-flex items-center px-1 pt-1 font-medium hover:text-main-blue">
										FAQs
									</Link>

									{userLoggedIn && !adminLoggedIn ? (
										<Link
											href="/orders"
											className="inline-flex items-center px-1 pt-1 font-medium hover:text-main-blue">
											Orders
										</Link>
									) : null}

									{adminLoggedIn ? (
										<Link
											href="/admin"
											className="inline-flex items-center px-1 pt-1 font-medium hover:text-main-blue">
											Clients Orders
										</Link>
									) : null}

									{adminLoggedIn ? (
										<Link
											href="/subscriptions"
											className="inline-flex items-center px-1 pt-1 font-medium hover:text-main-blue">
											Clients Subscriptions
										</Link>
									) : null}

									{router.asPath === '/login' ? null : <LoginButton />}
								</div>
								{!fullPage && userLoggedIn && formStep && formStep !== 'COMPLETE' ? (
									<div className="shrink-0">
										<button
											onClick={handleResume}
											type="button"
											className="relative inline-flex items-center gap-x-1.5 rounded-full bg-main-light-blue px-5 py-2 font-semibold tracking-wide text-white shadow-sm hover:bg-main-light-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-light-blue-500">
											Resume
										</button>
									</div>
								) : !fullPage ? (
									<div className="shrink-0">
										<button
											onClick={handleStartNow}
											type="button"
											className="relative inline-flex items-center gap-x-1.5 rounded-full bg-main-light-blue px-5 py-2 font-semibold tracking-wide text-white shadow-sm hover:bg-main-light-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-light-blue-500">
											Start Now
										</button>
									</div>
								) : null}
							</div>
							<div className="-mr-2 flex items-center md:hidden">
								{/* Mobile menu button */}
								<Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
									<span className="absolute -inset-0.5" />
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XMarkIcon className="size-8 block text-main-black" aria-hidden="true" />
									) : (
										<Bars3Icon className="size-8 block text-main-black" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="md:hidden">
						<div className="space-y-5 px-6 pb-10 pt-2">
							<Disclosure.Button
								as="a"
								href="/faqs"
								className={`${
									isCurrentRoute('/faqs') ? highlightStyles : regLinkStyles
								} block py-[1px] pr-4 text-base font-medium`}>
								FAQs
							</Disclosure.Button>
							<Disclosure.Button
								as="a"
								href="/login"
								className={`${
									isCurrentRoute('/login') ? highlightStyles : regLinkStyles
								} block py-[1px] pr-4 text-base font-medium`}>
								Log In
							</Disclosure.Button>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	)
}

export default Navbar
