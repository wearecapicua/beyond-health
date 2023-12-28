import PostPreview from 'components/post-preview'
import { PostDocument } from 'prismic-types'

type MoreStoriesProps = {
	posts: PostDocument[]
}

const MoreStories = ({ posts }: MoreStoriesProps) => {
	return (
		<section>
			<div className="mb-4 grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-2 md:gap-16 md:gap-y-20 lg:mb-32 lg:grid-cols-3">
				{posts.map((post) => (
					<PostPreview
						key={post.uid}
						href={post.url ?? '#'}
						category={(post.data.category as { data: { name: string } }).data?.name}
						title={post.data?.title as string}
						coverImage={post.data.image.url}
					/>
				))}
			</div>
		</section>
	)
}
export default MoreStories
