import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import QueryProvider from "../../modules/providers/QueryProvider";
import { defaultSEOConfig } from "../../../next-seo.config";
import Sidebar from "@/containers/Sidebar";
import RightSidebar from "@/containers/RightSidebar";
import Header from "@/containers/Header";
import { ProviderReduxToolkit } from "@/modules/providers/redux_provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...defaultSEOConfig,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
      >
        <ProviderReduxToolkit>
          <QueryProvider>
            <Header />
            <div className="flex justify-between">
              <Sidebar />
              <Toaster position="top-center" />
              {children}
              <RightSidebar />
            </div>
          </QueryProvider>
        </ProviderReduxToolkit>
      </body>
    </html>
  );
}
