import { MDXRemote } from 'next-mdx-remote/rsc';
import { format } from 'date-fns';
import { getPost, getAllPosts } from '@/lib/posts';
import { Badge } from '@/components/ui/badge';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">{post.frontmatter.title}</h1>
        <div className="text-muted-foreground mb-4">
          {format(new Date(post.frontmatter.date), 'MMMM dd, yyyy')}
        </div>
        <div className="flex gap-2 justify-center flex-wrap">
          {post.frontmatter.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <MDXRemote source={post.content} />
    </article>
  );
}