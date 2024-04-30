import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FreelanceHub",
  description: "Freelnacehub generated",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <Toaster position="top-right" richColors />
      <body
        className={cn("relative h-full font-sans antialiased", inter.className)}
      >
        <main className="relative flex flex-col ">
          <Providers>
            <Navbar />
            <div className="flex-grow flex-1">{children}</div>
          </Providers>
        </main>
      </body>
    </html>
  );
}
