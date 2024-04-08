import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { ClockIcon } from '@heroicons/react/24/outline'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Treatments`.
 */
export type TreatmentsProps = SliceComponentProps<Content.TreatmentsSlice>

/**
 * Component for "Treatments" Slices.
 */
const Treatments = ({ slice }: TreatmentsProps): JSX.Element => {
	const { items } = slice

	return (
		<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
			<div className="mx-auto max-w-[1180px] px-5 py-10 sm:px-0">
				<div className="flex flex-col gap-10 md:flex-row md:gap-5">
					{items.map((item: any, index) => (
						<a
							key={index}
							href={item.treatment.data.available ? `/${item.treatment.uid}` : undefined}
							className="h-426 relative flex-1"
						>
							<img
								src={item.treatment.data?.image.url}
								alt="Image 1"
								className=" h-full w-full rounded-3xl object-cover"
							/>
							{!item.treatment.data.available && (
								<div className="absolute right-3 top-2.5 flex items-center rounded-xl bg-main-black bg-opacity-20 px-6 py-2">
									<ClockIcon className="h-6 w-6 text-main-black" />
									<div className="ml-2">
										<p className="text-base font-semibold text-white">Soon</p>
									</div>
								</div>
							)}
							<div className="absolute inset-x-3 bottom-2.5 flex items-center justify-between rounded-xl bg-black px-4 py-2">
								<p className="text-2xl font-semibold text-white">{item.treatment.data?.title}</p>
								<ChevronRightIcon className="w-12 text-accent-green" />
							</div>
						</a>
					))}
				</div>
			</div>
		</section>
	)
}

export default Treatments
