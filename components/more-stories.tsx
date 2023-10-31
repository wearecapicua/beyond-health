import { PostDocument } from "prismic-types";
import PostPreview from "components/post-preview";

type MoreStoriesProps = {
  posts: PostDocument[];
};

export default function MoreStories({ posts }: MoreStoriesProps) {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-16 gap-y-20 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.uid}
            href={post.url ?? "#"}
            title={post.data.title}
            coverImage={post.data.image.url}
            date={post.data.date}
            author={post.data.author}
            description={post.data.description ?? ""}
          />
        ))}
      </div>
    </section>
  );
}
