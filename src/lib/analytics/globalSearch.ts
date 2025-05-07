import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PostMeta } from '@/types/type';


// 获取所有文章目录
const articlesDirectory = path.join(process.cwd(), 'src/content/posts');

export async function searchArticles(query: string): Promise<PostMeta[]> {
    // 获取所有MD文件
    const filenames = fs.readdirSync(articlesDirectory);

    const allArticles = await Promise.all(
        filenames.map(async (filename) => {
            const slug = filename.replace(/\.md$/, '');
            const fullPath = path.join(articlesDirectory, filename);
            const fileContents = fs.readFileSync(fullPath, 'utf8');

            // 解析frontmatter和内容
            const { data, content } = matter(fileContents);

            return {
                ...(data as PostMeta),
                slug,
                content,
                id: slug,
            };
        })
    );

    // 如果没有搜索词，返回所有文章
    if (!query) return allArticles;

    // 转换为小写以便不区分大小写搜索
    const queryLower = query.toLowerCase();

    // 过滤匹配的文章
    return allArticles.filter((article) => {
        const titleMatch = article.title?.toLowerCase().includes(queryLower);
        const contentMatch = article.content.toLowerCase().includes(queryLower);
        const excerptMatch = article.description?.toLowerCase().includes(queryLower);
        const tagMatch = article.tags?.some((tag: string) =>
            tag.toLowerCase().includes(queryLower)
        );

        return titleMatch || contentMatch || excerptMatch || tagMatch;
    });
}