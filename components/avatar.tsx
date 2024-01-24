import { ImageFieldImage } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'

type AvatarProps = {
	name?: string
	picture: ImageFieldImage | null | undefined
}

const Avatar = ({ name, picture }: AvatarProps) => {
	return (
		<div className="flex items-center">
			<PrismicNextImage field={picture} className="rounded-full" alt={''} fallbackAlt="" />
			{name && <div className="text-xl font-bold">{name}</div>}
		</div>
	)
}

export default Avatar
