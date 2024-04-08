import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `HowItWorks`.
 */
export type HowItWorksProps = SliceComponentProps<Content.HowItWorksSlice>

/**
 * Component for "HowItWorks" Slices.
 */
const HowItWorks = ({ slice }: HowItWorksProps): JSX.Element => {
	const { step_one_title, step_two_title, step_three_title, step_one_text, step_two_text, step_three_text } =
		slice.primary

	return (
		<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
			<div className="mx-auto max-w-[1190px] px-5 pt-10 lg:px-0">
				<div className="justify-between gap-20 pb-24 lg:flex lg:pb-28">
					<div className="mx-auto flex flex-col justify-center lg:mx-0 lg:w-[50%] lg:text-left">
						<span className="text-lg font-bold text-main-blue">STEP ONE</span>
						<h2 className="mt-4 font-sans leading-tight">{step_one_title}</h2>
						<p className="leading-1.5 mt-10 text-lg">{step_one_text}</p>
					</div>
					<div className="mt-12 flex h-[260px] justify-center overflow-hidden rounded-3xl bg-main-blue sm:h-[350px] lg:mt-0 lg:h-96 lg:w-[57%]">
						<img src={'/images/phone.svg'} alt="phone" className="mt-14 h-[550px] sm:h-[704px]" />
					</div>
				</div>
				<div className="flex flex-col-reverse justify-between gap-12 pb-24 pt-2 lg:flex-row lg:gap-20 lg:pb-28">
					<div className="flex h-[260px] justify-center overflow-hidden rounded-3xl bg-accent-green-800 sm:h-[350px] lg:h-96 lg:w-[57%]">
						<img src={'/images/phone2.svg'} alt="phone" className="mt-14 h-[550px] sm:h-[704px]" />
					</div>
					<div className="mx-auto flex flex-col justify-center lg:mx-0 lg:w-[50%] lg:text-left">
						<span className="text-lg font-bold text-main-blue">STEP TWO</span>
						<h2 className="mt-4 font-sans leading-tight">{step_two_title}</h2>
						<p className="leading-1.5 mt-10 text-lg">{step_two_text}</p>
					</div>
				</div>
				<div className="justify-between gap-20 pb-24 pt-2 lg:flex lg:pb-28">
					<div className="mx-auto flex flex-col justify-center lg:mx-0 lg:w-[50%] lg:text-left">
						<span className="text-lg font-bold text-main-blue">STEP THREE</span>
						<h2 className="mt-4 font-sans leading-tight">{step_three_title}</h2>
						<p className="leading-1.5 mt-10 text-lg">{step_three_text}</p>
					</div>
					<div className="mt-12 flex h-[260px] justify-center overflow-hidden rounded-3xl bg-main-blue sm:h-[350px] lg:mt-0 lg:h-96 lg:w-[57%]">
						<img
							src={'/images/mail.svg'}
							alt="phone"
							className="ml-28 mt-6 h-[365px] sm:h-[500px] lg:h-[565px]"
						/>
					</div>
				</div>
			</div>
		</section>
	)
}

export default HowItWorks
