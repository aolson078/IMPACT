import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "IMPACT Dashboard",
  description: "Dark, whimsical, and ready for dApp life.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-blackish-300 text-white relative overflow-x-hidden selection:bg-primary-600 selection:text-blackish-300">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <div className="fixed inset-0 z-[-1] wisp" />
      </body>
    </html>
  );
}
