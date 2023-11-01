import Layout from "components/layout";
import { createClient } from "lib/prismic";
import { PostDocument } from "prismic-types";
import MoreStories from "components/more-stories";
import HeroPost from "components/hero-post";

type PostsProps = {
  posts: PostDocument[];
};

function BlogHome({ posts }: PostsProps) {
  return (
    <Layout>
      <div className="bg-gray-000 min-h-screen">
        <div className="max-w-[1200px] px-6 py-20 mx-auto">
          {posts.length > 0 &&
            <HeroPost
              /* @ts-ignore */
              title={posts[0]?.data.title}
              coverImage={posts[0]?.data.image}
              date={posts[0]?.data.date}
              description={posts[0]?.data.description!}
              href={posts[0]?.url!}
              category={posts[0]?.data.category.data?.name}
            />
          }
          {posts.length ? <MoreStories posts={posts.slice(1)} />
            : <p>No posts to show</p>
          }
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const client = createClient();

  const posts = await client.getAllByType("post", {
    fetchLinks: 'category.name',
    orderings: {
      field: 'document.first_publication_date',
      direction: 'desc',
    },
  });
  return {
    props: {
      posts,
    },
  };
}

export default BlogHome;
