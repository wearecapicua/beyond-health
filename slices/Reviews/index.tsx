import { StarIcon } from '@heroicons/react/20/solid'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Reviews`.
 */
export type ReviewsProps = SliceComponentProps<Content.ReviewsSlice>

/**
 * Component for "Reviews" Slices.
 */
const Reviews = ({ slice }: ReviewsProps): JSX.Element => {
	const { items } = slice

	return (
		<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
			<div className="mx-auto max-w-[1180px] px-5 py-10 sm:px-0">
				<div className="flex flex-col gap-7 sm:gap-5 md:flex-row">
					{items.map((item: any, index) => {
						const starCount = parseInt(item.review?.data.rating)

						return (
							<div key={index} className="h-426 relative flex-1 rounded-3xl bg-white px-6 py-10">
								<div className="mb-10 flex justify-between">
									<span className="font-raleway text-[22px] font-semibold">
										{item.review.data?.name}
									</span>
									<div className="flex gap-1">
										{Array.from({ length: starCount }).map((_, index) => (
											<StarIcon key={index} className="h-5 w-5 text-accent-green" />
										))}
									</div>
								</div>
								<p className="text-xl tracking-wide">{item.review.data?.text}</p>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}

export default Reviews
