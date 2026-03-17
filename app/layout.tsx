import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Content Engine AI",
  description: "Turn one idea into viral content across Instagram, Shorts, and blogs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
