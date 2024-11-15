import Link from 'next/link';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { Post } from '@/lib/posts';

export function PostCard({ post }: { post: Post }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="space-y-1">
          <Link
            href={`/posts/${post.slug}`}
            className="text-2xl font-bold hover:underline"
          >
            {post.frontmatter.title}
          </Link>
          <p className="text-sm text-muted-foreground">
            {format(new Date(post.frontmatter.date), 'MMMM dd, yyyy')}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          {post.frontmatter.excerpt}
        </p>
        <div className="flex gap-2 flex-wrap">
          {post.frontmatter.tags.map((tag) => (
            <Link key={tag} href={`/?tag=${tag}`}>
              <Badge variant="secondary" className="hover:bg-secondary/80">
                {tag}
              </Badge>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}