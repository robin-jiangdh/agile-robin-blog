import type { Metadata } from "next";
import { Header, Footer } from "@/components/chrome";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${site.title} · ${site.tagline}`,
    template: `%s · ${site.title}`,
  },
  description: site.description,
  metadataBase: new URL(site.url),
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
    locale: "zh_CN",
  },
};

const themeInit = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light"){document.documentElement.classList.toggle("dark",t==="dark")}else{document.documentElement.classList.toggle("dark",window.matchMedia("(prefers-color-scheme: dark)").matches)}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
