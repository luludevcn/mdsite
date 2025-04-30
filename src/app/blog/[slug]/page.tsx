
import PostContent from '@/components/blog/PostContent';
import { getPostBySlug } from '@/lib/markdown/mdParser';
import TableOfContents from '@/components/blog/TableOfContent';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';


interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug)

    return {
      title: post.title,
      keywords: post.keywords,
      authors: [{ name: post.author, url: "https://luludev.cn" }],
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        images: post.coverImage
      },
      alternates: {
        canonical: `/posts/${slug}`
      }
    }
  } catch (error) {
    console.error(error);
    return {
      title: 'Post Not Found',
      description: 'The requested post does not exist.'
    }
  }
}

export default async function PostPage({ params }: PostPageProps) {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug)

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <article className="prose lg:prose-xl max-w-4xl flex-grow">
            <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
            <p className="text-gray-500 mb-8">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <PostContent content={post.content} />
          </article>

          <TableOfContents />
        </div>
      </div>
    )
  } catch (error) {
    console.error(error);
    return notFound()
  }
}