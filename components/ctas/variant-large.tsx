import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import useWindowSize from 'utils/useWindowSize'

/**
 * Props for `CtaSection`.
 */
export type CtaSectionProps = SliceComponentProps<Content.CtaSectionSlice>

/**
 * Component for "CtaSection" Slices.
 */
const LargeCta = ({ slice }: CtaSectionProps): JSX.Element => {
	const { heading, subheading, cta_button_text, image, mobile_image } = slice.primary
	const windowSize = useWindowSize()

	const isMobile = (windowSize as number) < 1024

	return (
		<div id="variant-lg" className="mx-auto w-full py-10 lg:py-20">
			{isMobile ? (
				<div className="relative mx-5 h-[830px] overflow-hidden rounded-3xl sm:mx-0">
					<div className="absolute left-0 top-0 z-10 px-6 pt-14 text-center md:px-0">
						<h1 className="z-10 font-sans leading-tight text-white lg:w-[610px]">{heading}</h1>
						<p className="z-10 mx-auto mt-6 w-full text-xl leading-8 text-gray-300 sm:w-3/4 lg:w-[515px]">
							{subheading}
						</p>

						<div className="mt-8 flex w-full items-center gap-x-6 lg:mt-6 lg:justify-start">
							<a
								href="/form/step-1"
								className="mx-auto w-full rounded-full bg-accent-green px-14 py-3 text-lg font-semibold text-main-black shadow-sm hover:bg-accent-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:w-auto">
								{cta_button_text}
							</a>
						</div>
					</div>
					<div className="relative h-full w-full">
						<img
							src={mobile_image?.url || undefined}
							alt="Beyond Health Logo"
							className="h-[830px] w-full object-cover"
						/>
					</div>
				</div>
			) : (
				<div className="cta-black-left-fade mx-5 overflow-hidden rounded-3xl sm:mx-0 lg:flex">
					<div className="cta-blue-black-fade mx-auto flex flex-col items-center justify-center px-6 pb-10 pt-14 text-center lg:mx-0 lg:max-w-md lg:items-start lg:py-0 lg:pl-11 lg:text-left">
						<h1 className="z-10 w-[610px] font-sans leading-tight text-white">{heading}</h1>
						<p className="z-10 mt-6 text-xl leading-8 text-gray-300 lg:w-[515px]">{subheading}</p>
						<div className="mt-8 flex w-full items-center justify-center gap-x-6 lg:mt-6 lg:justify-start">
							<a
								href="/form/step-1"
								className="w-full rounded-full bg-accent-green px-14 py-3 text-lg font-semibold text-main-black shadow-sm hover:bg-accent-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:w-auto">
								{cta_button_text}
							</a>
						</div>
					</div>
					<div className="relative h-full">
						<div className="cta-black-gray-fade absolute inset-y-0 left-0 h-[600px] w-[175px]" />
						<img src={image.url || undefined} alt="Beyond Health Logo" className="object-cover" />
					</div>
				</div>
			)}
		</div>
	)
}

export default LargeCta
