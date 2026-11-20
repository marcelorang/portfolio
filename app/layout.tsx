import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-face" });

export const metadata: Metadata = {
  title: "Marcelo Rangel — Full Stack Software Engineer",
  description:
    "Full stack software engineer focused on .NET/C#, AI/RAG, React/Next.js and React Native. Remote from Brazil.",
  openGraph: {
    title: "Marcelo Rangel — Full Stack Software Engineer",
    description: ".NET/C# · AI/RAG · React/Next.js · React Native. Remote from Brazil.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
