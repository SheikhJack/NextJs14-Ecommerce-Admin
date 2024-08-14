import { ClerkProvider, RedirectToSignIn } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "../globals.css";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MichStore - Admin Auth",
  description: "Admin dashboard to manage MichStore's data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
