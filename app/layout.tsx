import type { Metadata } from "next";
import "./globals.css";
import GamingRoomBackground from "@/components/GamingRoomBackground";

export const metadata: Metadata = {
  title: "Rock Paper Scissors - Multiplayer",
  description: "Real-time multiplayer Rock Paper Scissors game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen relative overflow-x-hidden">
        <GamingRoomBackground />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
