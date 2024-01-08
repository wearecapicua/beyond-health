import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Faqs`.
 */

// export type FaqsProps = SliceComponentProps<Content.FaqSlice>
export type FaqsProps = SliceComponentProps<Content.FaqsSlice>

/**
 * Component for "Faqs" Slices.
 */
const Faqs = ({ slice }: FaqsProps): JSX.Element => {
	const { items } = slice

	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="px-5 pb-10 pt-0 md:px-0 md:py-10">
			<div className="mx-auto max-w-[1180px] px-0 sm:border-b-[1px] sm:border-main-black/40">
				{items.map((item: any, index: number) => (
					<div key={`faq-${index}`} className="border-t-[1px] border-main-black/40 py-5">
						<Disclosure as="div">
							{({ open }) => (
								<>
									<Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
										<span className="text-xl font-semibold leading-7">
											{item.faq.data?.question}
										</span>
										<span className="ml-6 flex h-7 items-center">
											{open ? (
												<MinusSmallIcon
													className="h-6 w-6 text-main-light-blue"
													aria-hidden="true"
												/>
											) : (
												<PlusSmallIcon
													className="h-6 w-6 text-main-light-blue"
													aria-hidden="true"
												/>
											)}
										</span>
									</Disclosure.Button>
									<Disclosure.Panel as="dd" className="mt-2 pr-12">
										<p className="text-lg leading-7 text-gray-800">{item.faq.data?.answer}</p>
									</Disclosure.Panel>
								</>
							)}
						</Disclosure>
					</div>
				))}
			</div>
		</section>
	)
}

export default Faqs
