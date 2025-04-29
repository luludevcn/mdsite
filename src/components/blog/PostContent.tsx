'use client';

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import 'highlight.js/styles/github-dark.css';
import { slugify } from '@/lib/utils';

interface PostContentProps {
  content: string;
}

export default function PostContent({ content }: PostContentProps) {

  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw, rehypeHighlight]}
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ ...props }) => <h1 className="text-3xl font-bold my-4" {...props} />,
        h2: ({ ...props }) => <h2 id={`${slugify(props.children)}-${Math.random().toString(36).substring(2)}`} className="text-2xl font-bold my-3 scroll-mt-24" {...props} />,
        h3: ({ ...props }) => <h3 id={`${slugify(props.children)}-${Math.random().toString(36).substring(2)}`} className="text-xl font-bold my-2 scroll-mt-24" {...props} />,
        p: ({ ...props }) => <p className="my-4 leading-relaxed" {...props} />,
        a: ({ ...props }) => <a className="text-blue-600 hover:underline" {...props} />,
        code: ({ inline, className, children, ...props }) => {
          if (inline) {
            return <code className="bg-gray-100 px-1 py-0.5 rounded" {...props}>{children}</code>;
          }
          return <code className={className} {...props}>{children}</code>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}