'use client'

import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: "300",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className={`${ubuntu.className} w-screen h-screen flex flex-col justify-center items-center`}>{children}</main>;
}
