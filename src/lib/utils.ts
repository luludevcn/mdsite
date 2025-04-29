export function slugify(text: any) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')     // 空格替换为-
    .replace(/[^\w\-]+/g, '')  // 移除非单词字符
    .replace(/\-\-+/g, '-')    // 替换多个-为单个
    .replace(/^-+/, '')        // 移除开头的-
    .replace(/-+$/, '');       // 移除结尾的-
}