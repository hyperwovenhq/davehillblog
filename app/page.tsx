import { PostCard } from '@/components/post-card';
import { TagFilter } from '@/components/tag-filter';
import { getAllPosts } from '@/lib/posts';

export default async function Home({
  searchParams,
}: {
  searchParams: { tag?: string };
}) {
  const posts = await getAllPosts();
  const tag = searchParams.tag;
  
  const filteredPosts = tag
    ? posts.filter((post) => post.frontmatter.tags.includes(tag))
    : posts;

  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.frontmatter.tags))
  );

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Welcome to My Blog</h1>
        <p className="text-muted-foreground text-lg">
          Exploring technology, development, and everything in between.
        </p>
      </section>

      <TagFilter tags={allTags} activeTag={tag} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}