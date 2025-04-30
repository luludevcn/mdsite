import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { readFile } from 'fs/promises';

const postsDirectory = join(process.cwd(), 'src/content/posts');

export interface PostMeta {
  title: string;
  date: string;
  keywords: string;
  description: string;
  author: string;
  slug: string;
  tags?: string[];
  coverImage?: string;
}

export interface Post extends PostMeta {
  content: string;
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = join(postsDirectory, `${slug}.md`);
  const fileContents = await readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    ...(data as PostMeta),
    slug,
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  const slugs = readdirSync(postsDirectory)
    .map((file) => file.replace(/\.md/, ''));
  return slugs
    .map((slug) => {
      const { data } = matter(readFileSync(join(postsDirectory, `${slug}.md`), 'utf8'));
      return {
        ...(data as PostMeta),
        slug,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}