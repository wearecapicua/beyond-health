import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `InfoSection`.
 */
export type InfoSectionProps = SliceComponentProps<Content.InfoSectionSlice>

/**
 * Component for "InfoSection" Slices.
 */
const InfoSection = ({ slice }: InfoSectionProps): JSX.Element => {
	const {
		title,
		subtitle,
		blurb_one_title,
		blurb_one_subtitle,
		blurb_two_title,
		blurb_two_subtitle,
		blurb_three_title,
		blurb_three_subtitle
	} = slice.primary

	return (
		<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
			<div className="mx-auto py-10 sm:px-2.5">
				<div className="cta-light-blue-fade px-11 py-[75px] sm:rounded-3xl">
					<div className="mx-auto text-center lg:mx-0">
						<h2 className="leading-tight text-accent-green">{title}</h2>
						<p className="mx-auto mt-10 max-w-lg text-lg leading-normal text-white md:text-xl">
							{subtitle}
						</p>
					</div>
					<div className="mt-16 flex flex-col justify-between gap-12 md:flex-row md:gap-5">
						{/* FIXME: check this conflict */}
						{/* <div className="flex h-[370px] flex-col justify-between gap-10 overflow-hidden rounded-[20px] border border-solid border-white border-opacity-50 bg-accent-2 bg-white bg-opacity-10 px-6 py-10 md:h-[498px] md:flex-1 md:gap-14"> */}
						<div className="flex h-[370px] flex-col justify-between gap-10 overflow-hidden rounded-[20px] border border-solid border-white  bg-accent-2   px-6 py-10 md:h-[498px] md:flex-1 md:gap-14">
							<div className="flex flex-col">
								<span className="text-2xl font-medium text-white lg:text-[28px]">
									{blurb_one_title}
								</span>
								<p className="mt-6 text-lg text-white lg:text-[23px]">{blurb_one_subtitle}</p>
							</div>
							<div className="h-[60%] self-center">
								<img className="w-[270px]" src="/images/phone.svg" alt="phone" />
							</div>
						</div>
						{/* FIXME: check this conflict */}
						{/* <div className="flex h-[370px] flex-col justify-between gap-10 overflow-hidden rounded-[20px] border border-solid border-white border-opacity-50 bg-accent-2 bg-white bg-opacity-10 px-6 py-10 md:h-[498px] md:flex-1 md:gap-14"> */}
						<div className="flex h-[370px] flex-col justify-between gap-10 overflow-hidden rounded-[20px] border border-solid border-white  bg-accent-2   px-6 py-10 md:h-[498px] md:flex-1 md:gap-14">
							<div className="flex flex-col">
								<span className="text-2xl font-medium text-white lg:text-[28px]">
									{blurb_two_title}
								</span>
								<p className="mt-6 text-lg text-white lg:text-[23px]">{blurb_two_subtitle}</p>
							</div>
							<div className="h-[60%] self-center">
								<img src="/images/phone2.svg" alt="phone-2" />
							</div>
						</div>
						{/* FIXME: check this conflict */}
						{/* <div className="flex h-[370px] flex-col justify-between gap-10 overflow-hidden rounded-[20px] border border-solid border-white border-opacity-50 bg-accent-2 bg-white bg-opacity-10 px-6 py-10 md:h-[498px] md:flex-1 md:gap-14"> */}
						<div className="flex h-[370px] flex-col justify-between gap-10 overflow-hidden rounded-[20px] border border-solid border-white  bg-accent-2   px-6 py-10 md:h-[498px] md:flex-1 md:gap-14">
							<div className="flex flex-col">
								<span className="text-2xl font-medium text-white lg:text-[28px]">
									{blurb_three_title}
								</span>
								<p className="mt-6 text-lg text-white lg:text-[23px]">{blurb_three_subtitle}</p>
							</div>
							<div className="mt-[-28px] h-[60%] w-[470px]">
								<img src="/images/mail.svg" alt="mail" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default InfoSection
