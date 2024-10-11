import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";


  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en" className={GeistSans.className} suppressHydrationWarning>
        <body className="bg-purple-200 text-foreground min-h-screen w-full">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="min-h-screen w-full flex justify-center items-center">
              <div className="w-full">{children}</div>
            </main>
          </ThemeProvider>
        </body>
      </html>
    );
  }
  
