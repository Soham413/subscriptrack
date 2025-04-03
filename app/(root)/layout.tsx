import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Navbar from "../../components/Navbar";
import AppSidebar from "../components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Subscription Tracker",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className='antialiased'
      >
        <div className="flex bg-[#d8e2ff] text-black">
          {/* <SidebarProvider> */}
            <AppSidebar />
            <div className="right w-full">
              <Navbar />
              <main className="overflow-y-auto h-[90vh]">
                {children}
              </main>
            </div>
          {/* </SidebarProvider> */}
        </div>
      </body>
    </html>
  );
}
