import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ToasterContext from './context/ToasterContext';

const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Messenger Clone',
  description: 'Messenger Clone',
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterContext />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
