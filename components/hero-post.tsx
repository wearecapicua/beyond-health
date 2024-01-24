import { ImageFieldImage } from '@prismicio/client'
import { DateField } from '@prismicio/types'
import CoverImage from 'components/cover-image'
import Link from 'next/link'

type HeroPostProps = {
	title: string
	coverImage: ImageFieldImage | null | undefined
	date: DateField
	description: string
	href: string
	category: string
}

const HeroPost = ({ title, coverImage, category, href, description }: HeroPostProps) => {
	return (
		<section>
			<Link href={href || '/'} className="mb-20 block">
				<div className="mb-8 overflow-hidden rounded-2xl md:mb-16 md:flex">
					<div className="w-full md:w-1/2">
						<CoverImage title={title} href={href} image={coverImage} />
					</div>
					<div className="flex w-full flex-col justify-between bg-white p-8 md:w-1/2">
						<div>
							<h3 className="mb-6 font-raleway text-4xl font-bold lg:text-6xl lg:leading-tight">
								{title}
							</h3>
							<p className="mb-6 line-clamp-4 text-lg lg:line-clamp-5">{description}</p>
						</div>
						<p className="text-sm font-semibold leading-relaxed">{category}</p>
					</div>
				</div>
			</Link>
		</section>
	)
}

export default HeroPost
