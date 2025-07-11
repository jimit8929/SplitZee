import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Components
import Header from "@/components/Header";
import { ConvexClientProvider } from "@/components/convex-client-provider";

//Clerk
import { ClerkProvider } from "@clerk/nextjs";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SplitZee",
  description: "Slice the cost, not the fun",
  icons: {
    icon: "/logos/logo-s.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <ClerkProvider>
        <ConvexClientProvider>
          <Header />
        <main className="min-h-screen">{children}</main>
        </ConvexClientProvider>
      </ClerkProvider>
      </body>
    </html>
  );
}
