import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import {
  Archivo,
  Space_Grotesk,
  JetBrains_Mono,
} from "next/font/google";

import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mcwachira.com"),
  title: {
    default: "Charles Wachira — Senior Software Engineer & Technical Lead",
    template: "%s | Charles Wachira",
  },
  description:
    "Senior software engineer and technical lead in Nairobi. Full-stack systems, CRM architecture, business automation and API integrations for real businesses.",
  alternates: {
    canonical: "https://mcwachira.com/",
  },
  openGraph: {
    title: "Charles Wachira — Senior Software Engineer & Technical Lead",
    description:
      "Senior software engineer and technical lead in Nairobi. Full-stack systems, CRM architecture, business automation and API integrations for real businesses.",
    type: "profile",
    url: "https://mcwachira.com/",
    siteName: "Charles Wachira",
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Charles Wachira — Senior Software Engineer & Technical Lead",
    description:
      "Senior software engineer and technical lead in Nairobi. Full-stack systems, CRM architecture, business automation and API integrations for real businesses.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
                                      children,
                                    }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body
          className={`${archivo.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      >
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
          {children}
      </ThemeProvider>
      </body>
      </html>
  );
}