import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
/**
 * Props for `CtaSection`.
 */
export type CtaSectionProps = SliceComponentProps<Content.CtaSectionSlice>

/**
 * Component for "CtaSection" Slices.
 */
const InfoRightCta = ({ slice }: CtaSectionProps): JSX.Element => {
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
		<div id="variant-info-right" className="mx-auto pb-20 pt-10 md:pb-28">
			<div className="justify-between gap-10 px-5 sm:px-0 lg:flex">
				<div className=" h-full w-full overflow-hidden rounded-3xl lg:max-w-[500px] xl:max-w-[622px]">
					{/* FIXME:this are conflicting deleted h-[655px] */}
					{/* <div className="h-[655px] h-full w-full overflow-hidden rounded-3xl lg:max-w-[500px] xl:max-w-[622px]"> */}
					<img src={image.url || undefined} alt="Beyond Health Logo" className="object-cover" />
				</div>
				<div className="mx-auto mt-14 flex flex-col lg:mx-0 lg:mt-0 lg:w-1/2 lg:text-left xl:w-[40%]">
					<span className="text-lg font-bold text-main-blue">{introtext}</span>
					<h2 className="mt-4 font-sans leading-tight">{heading}</h2>
					<p className="leading-1.5 mb-10 mt-7 text-lg">{subheading}</p>
					{info_title_one && (
						<div className="my-1.5 flex items-center gap-3 rounded-[20px] border border-solid border-accent-3 bg-accent-2 px-10 py-6">
							<div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-main-blue">
								<span className="font-bold text-white">1</span>
							</div>
							<div className="flex flex-col">
								<span className="text-xl font-medium text-main-blue">{info_title_one}</span>
								{info_subtitle_one && <p className="mt-1">{info_subtitle_one}</p>}
							</div>
						</div>
					)}
					{info_title_two && (
						<div className="my-2 flex items-center gap-3 rounded-[20px] border border-solid border-accent-3 bg-accent-2 px-10 py-6">
							<div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-main-blue">
								<span className="font-bold text-white">2</span>
							</div>
							<div className="flex flex-col">
								<span className="text-xl font-medium text-main-blue">{info_title_two}</span>
								{info_subtitle_two && <p className="mt-1">{info_subtitle_two}</p>}
							</div>
						</div>
					)}
					{info_title_three && (
						<div className="my-2 flex items-center gap-3 rounded-[20px] border border-solid border-accent-3 bg-accent-2 px-10 py-6">
							<div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-main-blue">
								<span className="font-bold text-white">3</span>
							</div>
							<div className="flex flex-col">
								<span className="text-xl font-medium text-main-blue">{info_title_three}</span>
								{info_subtitle_three && <p className="mt-1">{info_subtitle_three}</p>}
							</div>
						</div>
					)}
					<div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
						<a
							href="/form/step-1"
							className="w-full rounded-full bg-main-light-blue px-14 py-3 text-center text-lg font-semibold text-white shadow-sm hover:bg-main-light-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:w-auto">
							{cta_button_text}
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default InfoRightCta
