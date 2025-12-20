import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans, Cascadia_Code } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import ScrollToTop from "@/components/shared/ScrollToTop";
import SmoothScroll from "@/components/shared/SmoothScroll";
import Chatbot from "@/components/features/chatbot/Chatbot";
import FloatingStats from "@/components/features/stats/FloatingStats";
import "./globals.css";

// Display Font - Bricolage Grotesque for headings
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Body Font - DM Sans for body text
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Monospace Font - Cascadia Code for code snippets
const cascadiaCode = Cascadia_Code({
  subsets: ["latin"],
  variable: "--font-cascadia",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sharifdotg.vercel.app'),
  title: "Sharif Md. Yousuf - Competitive Programmer & Software Developer",
  description: "Portfolio of Sharif Md. Yousuf, a competitive programmer and CSE student at University of Asia Pacific. ICPC Dhaka Regionalist 2024, showcasing web development projects and programming achievements.",
  keywords: [
    "Sharif Md. Yousuf",
    "SharifdotG",
    "competitive programming",
    "ICPC",
    "Codeforces",
    "web development",
    "Next.js",
    "React",
    "TypeScript",
    "University of Asia Pacific",
    "Bangladesh",
  ],
  authors: [{ name: "Sharif Md. Yousuf", url: "https://github.com/SharifdotG" }],
  creator: "Sharif Md. Yousuf",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sharifdotg.vercel.app",
    title: "Sharif Md. Yousuf - Competitive Programmer & Software Developer",
    description: "ICPC Dhaka Regionalist 2024 | CSE Student at UAP | Full-Stack Developer",
    siteName: "Sharif's Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sharif Md. Yousuf Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sharif Md. Yousuf - Competitive Programmer & Software Developer",
    description: "ICPC Dhaka Regionalist 2024 | CSE Student at UAP | Full-Stack Developer",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${dmSans.variable} ${cascadiaCode.variable}`}
    >
      <body className={`${dmSans.className} antialiased`}>
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ScrollToTop />
          <SmoothScroll />
          <FloatingStats />
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
