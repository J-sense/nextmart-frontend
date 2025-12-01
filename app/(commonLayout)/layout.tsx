import Navbar from "@/src/components/shared/Navbar";
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] });
export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className}>
      <Navbar />
      <main className="min-h-screen">{children}</main>
    </div>
  );
}
