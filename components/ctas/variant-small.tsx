import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import Image from 'next/image'
/**
 * Props for `CtaSection`.
 */
export type CtaSectionProps = SliceComponentProps<Content.CtaSectionSlice>

/**
 * Component for "CtaSection" Slices.
 */
const SmallCta = ({ slice }: CtaSectionProps): JSX.Element => {
	const { heading, subheading, cta_button_text, image } = slice.primary

	return (
		<div id="variant-sm" className="mx-auto sm:py-24">
			<div className="radial-gradient-blue-green relative isolate justify-between px-6 pb-24 pt-8 shadow-2xl sm:rounded-3xl sm:py-12 md:px-11 md:pb-28 lg:flex lg:gap-x-20 xl:py-0">
				<div className="mx-auto max-w-md pb-12 pt-8 text-center md:py-10 lg:mx-0 lg:flex-auto lg:text-left">
					<h2 className="font-sans leading-tight text-white">{heading}</h2>
					<p className="mt-10 text-lg leading-8 text-gray-300">{subheading}</p>
					<div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
						<a
							href="/"
							className="w-full rounded-full bg-accent-green px-16 py-3 text-xl font-semibold text-main-black shadow-sm hover:bg-accent-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:w-auto"
						>
							{cta_button_text}
						</a>
					</div>
				</div>
				<div className="relative xl:mb-[-56px] xl:mt-[-50px]">
					<Image
						src={image.url!}
						alt="Beyond Health Logo"
						width="602"
						height="408"
						className="mx-auto overflow-hidden rounded-[20px]"
					/>
				</div>
			</div>
		</div>
	)
}

export default SmallCta
