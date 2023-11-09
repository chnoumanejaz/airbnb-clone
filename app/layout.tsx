import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import ClientOnly from './ClientOnly';
import RegisterModal from './components/Modals/RegisterModal';
import Navbar from './components/Navbar/Navbar';
import './globals.css';
import ToasterProvider from './providers/ToasterProvider';

const font = Nunito({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Airbnb Clone | Nouman Ejaz',
  description: 'Airbnb clone',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className} suppressHydrationWarning={true}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
