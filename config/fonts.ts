import { Fira_Code as FontMono, Inter as FontSans } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

// SolaimanLipi font for Bangla text
export const fontBangla = {
  variable: "--font-bangla",
};
