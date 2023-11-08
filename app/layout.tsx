import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import Navbar from './components/Navbar/Navbar';
import './globals.css';

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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
