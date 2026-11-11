import { Unbounded } from "next/font/google";
import type { ReactNode } from "react";

// Unbounded is display type for the landing only; it is never loaded inside the app.
const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export default function MarketingLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <div className={`${unbounded.variable} contents`}>{children}</div>;
}
