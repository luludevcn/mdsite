import '../styles/globals.css';
import StoreProvider from '@/providers';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}