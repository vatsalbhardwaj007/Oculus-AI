import type { Metadata } from "next";
import "./globals.css";
import { AgentProvider } from "../lib/state/useAgentStore";

export const metadata: Metadata = {
  title: "OCULUS-AI // Autonomous Cybersecurity Agent",
  description: "Autonomous AI cybersecurity persona that discovers, evaluates, remembers, decides, and publishes security intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-oculus-bg text-oculus-textMain">
        <AgentProvider>
          {children}
        </AgentProvider>
      </body>
    </html>
  );
}
