import { PostDocument } from "prismic-types";
import PostPreview from "components/post-preview";

type MoreStoriesProps = {
  posts: PostDocument[];
};

export default function MoreStories({ posts }: MoreStoriesProps) {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 md:gap-16 md:gap-y-20 mb-4 lg:mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.uid}
            href={post.url ?? "#"}
            /* @ts-ignore */
            category={post.data.category.data?.name}
            /* @ts-ignore */
            title={post.data?.title}
            coverImage={post.data.image.url}
          />
        ))}
      </div>
    </section>
  );
}
