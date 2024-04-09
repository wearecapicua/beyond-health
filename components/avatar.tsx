import { ImageFieldImage } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import Image from 'next/image'

type AvatarProps = {
	name?: string
	picture: ImageFieldImage | null | undefined
}

const Avatar = ({ name, picture }: AvatarProps) => {
	if (picture?.url?.includes('platform-lookaside.fbsbx.com')) {
		return <Image className="rounded-full" width="40" height="40" src={picture.url} alt={''} />
	}

	return (
		<div className="flex items-center">
			<PrismicNextImage field={picture} className="rounded-full" alt={''} fallbackAlt="" />
			{name && <div className="text-xl font-bold">{name}</div>}
		</div>
	)
}

export default Avatar
