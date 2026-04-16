import type { Metadata } from "next";
import { Inter, Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MainLayout from "@/components/MainLayout";
import courseManifest from "@/data/course_manifest.json";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoBengali = Noto_Serif_Bengali({ 
  subsets: ["bengali"], 
  weight: ["400", "700"],
  variable: "--font-noto-bengali"
});

export const metadata: Metadata = {
  title: "AI Masterclass | By 360infotech",
  description: "Learn Machine Learning from 0 to Agentic AI with frontier models.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`${inter.variable} ${notoBengali.variable}`}>
      <body className="antialiased">
        <MainLayout weeks={courseManifest.weeks}>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
