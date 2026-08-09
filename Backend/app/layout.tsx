import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oculus AI",
  description: "Autonomous AI Technology Intelligence Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
