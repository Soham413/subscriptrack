import type { Metadata } from "next";
// import { Geist, Geist_Mono, Inter } from "next/font/google";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import AppSidebar from "../components/AppSidebar";
import { SidebarProvider } from "@/components/sidebar";
import PageWrapper from "./PageWrapper";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/store/StoreProvider";
import NextTopLoader from "nextjs-toploader"

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: "SubsTrack",
  description: "SubsTrack is a subscription tracker web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <NextTopLoader
          color="#222eff"
          crawlSpeed={300}
          height={3}
          crawl={true}
          showSpinner={false}
        />
        <div className="flex bg-[#d8e2ff] text-black">
          <StoreProvider>
            <SidebarProvider>
              <AppSidebar />
              <PageWrapper>{children}</PageWrapper>
              <Toaster
                toastOptions={{
                  duration: 1000 * 4,
                  className: 'text-xs tracking-[0.4px] text-gray-600 font-semibold shadow-lg',
                  style: {
                    border: '1px solid #4B2BE3',
                    padding: '10px 20px',
                    borderRadius: '10px',
                  },
                  // iconTheme: {
                  //   primary: '#222eff',
                  //   secondary: '#FFFAEE',
                  // },
                }}
              />
            </SidebarProvider>
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
