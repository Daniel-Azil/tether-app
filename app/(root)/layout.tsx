import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import "../globals.css";
import LeftPageBar from "@/components/distributedObjects/LeftPageBar";
import PageBottomBar from "@/components/distributedObjects/PageBottomBar";
import RightBar from "@/components/distributedObjects/RightBar";
import HeaderBar from "@/components/distributedObjects/HeaderBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tether",
  description: "A social media application for connecting with friends and communities",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang='en'>
        <body className={inter.className}>
          <HeaderBar />

          <main className='flex flex-row'>
            <LeftPageBar />
            <section className='main-container'>
              <div className='w-full max-w-4xl'>{children}</div>
            </section>
            
          </main>

          <PageBottomBar />
        </body>
      </html>
    </ClerkProvider>
  );
}
