import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `CtaSection`.
 */
export type CtaSectionProps = SliceComponentProps<Content.CtaSectionSlice>

/**
 * Component for "CtaSection" Slices.
 */
const InfoLeftCta = ({ slice }: CtaSectionProps): JSX.Element => {
	const {
		heading,
		subheading,
		cta_button_text,
		image,
		introtext,
		info_title_one,
		info_title_two,
		info_title_three,
		info_subtitle_one,
		info_subtitle_two,
		info_subtitle_three
	} = slice.primary

	return (
		<div id="variant-info-left" className="mx-auto pb-16 pt-6 sm:pt-10">
			<div className="cta-light-blue-fade justify-between gap-10 px-5 pb-20 pt-16 sm:rounded-3xl lg:flex lg:pl-11 lg:pr-9 xl:py-0">
				<div className="mx-auto flex flex-col justify-center lg:mx-0 lg:w-1/2 lg:text-left xl:w-[40%]">
					<span className="text-lg font-bold text-white">{introtext}</span>
					<h2 className="mt-4 font-sans leading-tight text-accent-green">{heading}</h2>
					<p className="leading-1.5 my-7 text-lg">{subheading}</p>
					{info_title_one && (
						// FIXME: this is conflict we have to check
						// <div className="mb-3 flex items-center gap-6 rounded-[20px] border border-solid border-white border-opacity-50 bg-accent-2 bg-white bg-opacity-10 px-10 py-6 md:my-1.5">
						<div className="mb-3 flex items-center gap-6 rounded-[20px] border border-solid border-white bg-accent-2   px-10 py-6 md:my-1.5">
							<div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-main-blue">
								<span className="font-bold text-white">1</span>
							</div>
							<div className="flex flex-col">
								<span className="text-xl font-bold text-white">{info_title_one}</span>
								{info_subtitle_one && <p className="mt-1 text-white">{info_subtitle_one}</p>}
							</div>
						</div>
					)}
					{info_title_two && (
						// FIXME: this is conflict we have to check
						// <div className="my-3 flex items-center gap-6 rounded-[20px] border border-solid border-white border-opacity-50 bg-accent-2 bg-white bg-opacity-10 px-10 py-6 md:my-2">
						<div className="my-3 flex items-center gap-6 rounded-[20px] border border-solid border-white  bg-white bg-opacity-10 px-10 py-6 md:my-2">
							<div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-main-blue">
								<span className="font-bold text-white">2</span>
							</div>
							<div className="flex flex-col">
								<span className="text-xl font-bold text-white">{info_title_two}</span>
								{info_subtitle_two && <p className="mt-1 text-white">{info_subtitle_two}</p>}
							</div>
						</div>
					)}
					{info_title_three && (
						// FIXME: this is conflict we have to check
						// <div className="my-3 flex items-center gap-6 rounded-[20px] border border-solid border-white border-opacity-50 bg-accent-2 bg-white bg-opacity-10 px-10 py-6 md:my-2">
						<div className="my-3 flex items-center gap-6 rounded-[20px] border border-solid border-white  bg-accent-2   px-10 py-6 md:my-2">
							<div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-main-blue">
								<span className="font-bold text-white">3</span>
							</div>
							<div className="flex flex-col">
								<span className="text-xl font-bold text-white">{info_title_three}</span>
								{info_subtitle_three && <p className="mt-1 text-white">{info_subtitle_three}</p>}
							</div>
						</div>
					)}
					<div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
						<a
							href="/form/step-1"
							className="w-full rounded-full bg-accent-green px-14 py-3 text-center font-semibold text-main-black shadow-sm hover:bg-accent-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:w-auto">
							{cta_button_text}
						</a>
					</div>
				</div>
				<div className="mt-14 h-full overflow-hidden rounded-3xl lg:mb-[-35px] lg:mt-[35px]  lg:max-w-[500px] xl:h-[794px] xl:max-w-[610px]">
					<img src={image.url || undefined} alt="Beyond Health Logo" className="object-cover" />
				</div>
			</div>
		</div>
	)
}

export default InfoLeftCta
