import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface Post {
  slug: string;
  content: string;
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        content,
        frontmatter: {
          title: data.title,
          date: data.date,
          excerpt: data.excerpt,
          tags: data.tags || [],
        },
      };
    });

  return posts.sort((a, b) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  });
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      frontmatter: {
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        tags: data.tags || [],
      },
    };
  } catch {
    return null;
  }
}