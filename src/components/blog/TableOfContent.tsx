'use client';

import { useHeadingsData, useIntersectionObserver } from '@/hooks/tableOfContents';
import { useState } from 'react';

export default function TableOfContents() {
  const [activeId, setActiveId] = useState<string>('');
  const { nestedHeadings } = useHeadingsData();
  useIntersectionObserver(setActiveId);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      // 更新URL hash但不触发跳转
      window.history.pushState(null, '', `#${id}`);
    }
  };

  if (nestedHeadings.length === 0) {
    return null;
  }

  return (
    <div className="hidden lg:block sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto pt-2">
      <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          目录
        </h2>
        <nav aria-label="文章导航">
          <ul className="space-y-2">
            {nestedHeadings.map((heading) => (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHeading(heading.id);
                  }}
                  className={`block text-sm transition-colors ${activeId === heading.id
                      ? 'text-blue-600 dark:text-blue-400 font-medium'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    } ${heading.level === 'h3' ? 'pl-4' : ''
                    }`}
                >
                  {heading.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}