import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { Providers } from "@/providers";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bleu NFT",
  description: "Manage tour Bleu NFTs here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          rubik.className,
          "bg-background text-foreground flex flex-col min-h-screen min-w-screen"
        )}
      >
        <Providers>
          <Header />
          {children}
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
