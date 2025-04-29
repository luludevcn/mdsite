import { useEffect, useState } from 'react';

interface HeadingElement extends Element {
  id: string;
  textContent: string | null;
}

export interface Heading {
  id: string;
  title: string | null;
  level: 'h2' | 'h3';
}

export const useHeadingsData = () => {
  const [nestedHeadings, setNestedHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll<HeadingElement>('h2, h3')
    );

    const newNestedHeadings = headingElements.map((heading) => ({
      id: heading.id,
      title: heading.textContent,
      level: heading.nodeName.toLowerCase() as 'h2' | 'h3',
    }));

    setNestedHeadings(newNestedHeadings);
  }, []);

  return { nestedHeadings };
};

export const useIntersectionObserver = (setActiveId: (id: string) => void) => {
  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('h2, h3'));
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -80% 0%', threshold: 1 }
    );

    headingElements.forEach((element) => observer.observe(element));

    return () => {
      headingElements.forEach((element) => observer.unobserve(element));
    };
  }, [setActiveId]);
};