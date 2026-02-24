import type { Metadata } from "next";
import { draftMode } from "next/headers";
import {
  Averia_Serif_Libre,
  Londrina_Solid,
  Londrina_Sketch,
  Londrina_Outline,
  Londrina_Shadow,
  Merriweather,
} from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/Header";
import PreviewBanner from "@/components/PreviewBanner";

const averiaSerifLibre = Averia_Serif_Libre({
  variable: "--font-averia-serif-libre",
  weight: "400",
  subsets: ["latin"],
});

const londrinaSolid = Londrina_Solid({
  variable: "--font-londrina-solid",
  weight: ["100", "300", "400"],
  subsets: ["latin"],
});

const londrinaSketch = Londrina_Sketch({
  variable: "--font-londrina-sketch",
  weight: "400",
  subsets: ["latin"],
});

const londrinaOutline = Londrina_Outline({
  variable: "--font-londrina-outline",
  weight: "400",
  subsets: ["latin"],
});

const londrinaShadow = Londrina_Shadow({
  variable: "--font-londrina-shadow",
  weight: "400",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ted Duchamp",
  description: "Official Website of Ted Duchamp",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = await draftMode();
  return (
    <html lang="en">
      <body
        className={`${averiaSerifLibre.variable} ${londrinaSolid.variable} ${merriweather.variable} ${londrinaSketch.variable} ${londrinaOutline.variable} ${londrinaShadow.variable} antialiased`}
      >
        {isEnabled && <PreviewBanner />}
        <Header />
        {children}
      </body>
    </html>
  );
}
