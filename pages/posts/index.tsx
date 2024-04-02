import HeroPost from 'components/hero-post'
import Layout from 'components/layout'
import MoreStories from 'components/more-stories'
import { createClient } from 'lib/prismic'
import { PostDocument } from 'prismic-types'

type PostsProps = {
	posts: PostDocument[]
}

const BlogHome = ({ posts }: PostsProps) => {
	return (
		<Layout>
			<div className="min-h-screen bg-gray-000">
				<div className="mx-auto max-w-[1200px] px-6 py-16 lg:py-20">
					{posts.length > 0 && (
						<HeroPost
							title={posts[0]?.data.title as string}
							coverImage={posts[0]?.data.image}
							date={posts[0]?.data.date}
							description={posts[0]?.data.description || ''}
							href={posts[0]?.url || ''}
							category={(posts[0]?.data.category as { data: { name: string } }).data?.name}
						/>
					)}
					{posts.length ? <MoreStories posts={posts.slice(1)} /> : <p>No posts to show</p>}
				</div>
			</div>
		</Layout>
	)
}

export async function getServerSideProps() {
	const client = createClient()

	const posts = await client.getAllByType('post', {
		fetchLinks: 'category.name',
		orderings: {
			field: 'document.first_publication_date',
			direction: 'desc'
		}
	})

	return {
		props: {
			posts
		}
	}
}

export default BlogHome
