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