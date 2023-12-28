import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Header`.
 */
export type HeaderProps = SliceComponentProps<Content.HeaderSlice>

/**
 * Component for "Header" Slices.
 */
const Header = ({ slice }: HeaderProps): JSX.Element => {
	const { title, subtitle, cta_button_text } = slice.primary

	return (
		<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
			<div className="px-6 py-14 sm:px-6 sm:py-14 lg:px-8 lg:pt-20">
				<div className="mx-auto max-w-screen-lg text-center">
					<h1 className="leading-tight">{title}</h1>
					{subtitle && (
						<p className="mx-auto mt-10 max-w-screen-sm text-lg leading-8 md:text-xl">{subtitle}</p>
					)}
					{cta_button_text && (
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<a
								href="/mens-hair-loss"
								className="w-full rounded-full bg-main-light-blue px-16 py-3 font-semibold text-white shadow-sm hover:bg-main-light-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:w-auto">
								{cta_button_text}
							</a>
						</div>
					)}
				</div>
			</div>
		</section>
	)
}

export default Header
