import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/app/styles/globals.css'

import Provider  from "@/providers/theme-provider";

import classNames from "classnames";
import {cookies} from "next/headers";
import { ToastProvider } from '@/providers/toast-provider'
import Template from "@/app/template";
import siteMetadata from "@/lib/siteMetaData";
import Navbar from "@/components/ui/Header/Navbar";
import Footer from "@/components/ui/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: siteMetadata.title, // a default is required when creating a template
  },
  description: siteMetadata.description,
  icons:{
    icon:siteMetadata.siteLogo
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    // images: [siteMetadata.socialBanner],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    // images: [siteMetadata.socialBanner],
  },
};


function getTheme() {
  const cookieStore = cookies();
  const themeCookie = cookieStore.get("theme");
  const theme = themeCookie ? themeCookie.value : "dark";
  return theme;
}
export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {

  const theme = getTheme() as string;
  return (
      <html lang="en"
            className={classNames(inter.className, 'scroll-smooth',theme)}
            style={{ colorScheme: theme }}
            suppressHydrationWarning
      >
      <body>
      <link rel="icon" href="/logo/png/color.png" sizes="any"/>
      <Provider>

        <Navbar/>
        <Template>
          <ToastProvider/>
          {children}
        </Template>
        {/*<Footer />*/}
      </Provider>
      </body>
      </html>
  );
}