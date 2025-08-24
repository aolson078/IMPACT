import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "./providers";

export const metadata = {
  title: "IMPACT Dashboard",
  description: "",
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
        <Providers>
          <main className="min-h-screen">{children}</main>
        </Providers>
        <Footer />
        <div className="fixed inset-0 z-[-1] wisp" />
      </body>
    </html>
  );
}
