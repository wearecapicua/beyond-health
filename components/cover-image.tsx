import { ImageFieldImage } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import cn from 'classnames'
import Link from 'next/link'

type CoverImageProps = {
	title: string
	image: ImageFieldImage | null | undefined
	href?: string
}

const CoverImage = ({ title, image: imageField, href }: CoverImageProps) => {
	const image = (
		<PrismicNextImage
			field={imageField}
			width={600}
			height={460}
			imgixParams={{ fit: 'fill', ar: '2:1' }}
			className={cn('shadow-small', {
				'hover:shadow-medium transition-shadow duration-200 w-full h-full object-cover': href
			})}
			alt={imageField?.alt as ''}
			fallbackAlt=""
			priority
		/>
	)

	return (
		<>
			{href ? (
				<Link href={href} aria-label={title}>
					{image}
				</Link>
			) : (
				image
			)}
		</>
	)
}

export default CoverImage
