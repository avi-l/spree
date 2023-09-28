import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/providers/ModalProvider";
import { ToasterProvider } from "@/providers/ToastProvider";
import { useDarkModeStore } from "@/hooks/zustandUtils";
import DarkModeSwitchProvider from "@/providers/DarkModeSwitchProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={`${inter.className}`}>
          <ToasterProvider />
          <ModalProvider />
          <DarkModeSwitchProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
