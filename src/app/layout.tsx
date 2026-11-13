import type { Metadata } from "next";
import { Figtree } from "next/font/google";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Allied Hiring | Top 1% talent. Fully managed.",
  description:
    "Build your India team without an Indian entity. Allied Hiring recruits, employs and manages your people. You lead the work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="js" suppressHydrationWarning>
      <body className={figtree.className}>{children}</body>
    </html>
  );
}
