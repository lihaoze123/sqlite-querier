import type { Metadata } from "next";
import "@/app/ui/globals.css";
import { inter } from "@/app/ui/fonts";

export const metadata: Metadata = {
  title: "SQLite Querier",
  description: "A simple tool to query SQLite databases",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
