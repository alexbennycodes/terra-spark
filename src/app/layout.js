import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import Providers from "./Providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TerraSpark",
  description:
    "TerraSpark is your gateway to exploring the world! Discover detailed information about every country, including flags, cultures, and more. Fuel your wanderlust or become a world trivia whiz with TerraSpark.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" sizes="any" />
      </head>
      <body className={cn("dark", inter.className)}>
        <Providers>{children}</Providers>
        <div className="fixed inset-0 -z-20 h-screen w-full items-center [background:radial-gradient(125%_125%_at_50%_10%,#020817_60%,#08205D_100%)]"></div>
      </body>
    </html>
  );
}
