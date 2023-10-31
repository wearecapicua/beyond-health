import { PostDocument } from "prismic-types";
import PostPreview from "components/post-preview";

type MoreStoriesProps = {
  posts: PostDocument[];
};

export default function MoreStories({ posts }: MoreStoriesProps) {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.uid}
            href={post.url ?? "#"}
            title={post.data.name}
            coverImage={post.data.image}
            date={post.data.date}
            author={post.data.author}
            description={post.data.description ?? ""}
          />
        ))}
      </div>
    </section>
  );
}
