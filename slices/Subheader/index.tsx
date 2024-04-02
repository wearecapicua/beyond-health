import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Subheader`.
 */
export type SubheaderProps = SliceComponentProps<Content.SubheaderSlice>

/**
 * Component for "Subheader" Slices.
 */
const Subheader = ({ slice }: SubheaderProps): JSX.Element => {
	const { title, subtitle } = slice.primary
	return (
		<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
			<div className="px-6 py-8 sm:px-6 sm:py-14 lg:px-8">
				<div className="mx-auto max-w-screen-lg text-center">
					<h2 className="leading-tight">{title}</h2>
					{subtitle && <p className="mx-auto mt-10 max-w-[820px] text-lg leading-8">{subtitle}</p>}
				</div>
			</div>
		</section>
	)
}

export default Subheader
