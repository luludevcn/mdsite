/** @type {import('next-sitemap').IConfig} */

module.exports = {
    siteUrl: 'https://www.luludev.cn',
    generateRobotsTxt: true,
    sitemapSize: 1000,
    exclude: ['/admin', '/private', '/api'],
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', allow: '/' },
            { userAgent: '*', disallow: ['/admin', '/private', '/api'] },
        ],
    },
};