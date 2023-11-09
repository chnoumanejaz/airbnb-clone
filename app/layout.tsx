import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import ClientOnly from './ClientOnly';
import LoginModal from './components/Modals/LoginModal';
import RegisterModal from './components/Modals/RegisterModal';
import Navbar from './components/Navbar/Navbar';
import './globals.css';
import ToasterProvider from './providers/ToasterProvider';
import getCurrentUser from './actions/getCurrentUser';

const font = Nunito({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Airbnb Clone | Nouman Ejaz',
  description: 'Airbnb clone',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className} suppressHydrationWarning={true}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
