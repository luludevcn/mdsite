import '../styles/globals.css';
import StoreProvider from '@/providers';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { Analytics } from "@vercel/analytics/react"
import Script from 'next/script';
import { SpeedInsights } from '@vercel/speed-insights/next';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="baidu-site-verification" content="codeva-oeTsHTdcjc" />
        <meta
          name="description"
          content={"前端,全栈开发,Nodejs,react,angular,javascript,typescript,css,html,关于前端的一切"}
        />
        <meta
          name="keywords"
          content={"全栈开发,Nodejs,react,typescript,css,javascript,旅游，读书，见闻"}
        />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" type="image/svg+xml" href="/images/logo.png" />
        <link rel="sitemap" href="/sitemap-index.xml" />
        <meta name="baidu_union_verify" content="7a742ef3ff07d7d9c0dd2e98e91ca2a1" />
        <meta
          name="google-site-verification"
          content="SGbZh_3h9aOC3p6NGDz4XEe_aNk_5WTqybu4GCGVsK4"
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9382467735244088"
          crossOrigin="anonymous"></Script>
      </head>
      <body>
        <StoreProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </StoreProvider>
        <Analytics />
        <SpeedInsights />

      </body>
    </html>
  );
}