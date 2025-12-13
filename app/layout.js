import { Inter } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/index.css';
import '../src/App.css';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Isyara - Solusi Inklusif untuk Komunikasi Tunarungu',
  description: 'Isyara adalah aplikasi web inovatif yang menerjemahkan suara, video, dan teks secara otomatis ke dalam bahasa isyarat Indonesia (BISINDO)',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

