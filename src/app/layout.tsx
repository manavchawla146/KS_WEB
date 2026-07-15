import type { Metadata } from "next";
import { SmoothCursor } from "@/components/smooth-cursor";
import "./globals.css";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "KS School of Business Management & Information Technology",
  description: "Empowering minds through business excellence and cutting-edge technology education. Explore BBA, BCA, MBA, MCA and more at KS School.",
  keywords: ["KS School", "Business Management", "Information Technology", "BBA", "BCA", "MBA", "MCA", "Education"],
  authors: [{ name: "KS School" }],
  icons: {
    icon: "/ks-logo.png",
  },
  openGraph: {
    title: "KS School of Business Management & IT",
    description: "Empowering minds through business excellence and cutting-edge technology education.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KS School of Business Management & IT",
    description: "Empowering minds through business excellence and cutting-edge technology education.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-zinc-900">
        <SmoothCursor />
        <Nav />
        {children}
      </body>
    </html>
  );
}