import { DateField } from '@prismicio/types'
import Image from 'next/image'
import Link from 'next/link'

import { AuthorContentRelationshipField } from '../lib/types'

type PostPreviewProps = {
	title: string
	coverImage: string | null | undefined
	date?: DateField
	description?: string
	author?: AuthorContentRelationshipField
	href: string
	category: string
}

const PostPreview = ({ title, coverImage, href, category }: PostPreviewProps) => {
	return (
		<Link href={href} className="inline-block">
			<div className="overflow-hidden rounded-2xl bg-white">
				<div className="relative h-56">
					<Image alt={title} src={coverImage as string} fill={true} style={{ objectFit: 'cover' }} />
				</div>
				<div className="flex h-40 flex-col justify-between bg-white p-6">
					<div>
						<h3 className="line-clamp-2 font-raleway text-2xl font-medium leading-snug">{title}</h3>
					</div>
					<p className="text-sm font-semibold leading-relaxed">{category}</p>
				</div>
			</div>
		</Link>
	)
}

export default PostPreview
