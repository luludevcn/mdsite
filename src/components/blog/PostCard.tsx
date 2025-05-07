import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from 'date-fns';
import { PostMeta } from '@/types/type';

interface PostCardProps {
  post: PostMeta;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {post.coverImage && (
        <div className="h-48 relative overflow-hidden pt-6 text-center">
          <Image
            src={post.coverImage}
            width={100}
            height={100}
            alt={post.title}
            className="w-4/5 h-4/5 object-contain inline-block"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-amber-50 dark:bg-blue-900 text-blue-500 dark:text-blue-100 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
          <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {post.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(new Date(post.date), 'MMMM d, yyyy')}
          </span>
          <Link
            href={`/blog/${post.slug}`}
            className="text-blue-500 dark:text-blue-400 hover:underline text-sm font-medium"
          >
            Read more →
          </Link>
        </div>
      </div>
    </div>
  );
}