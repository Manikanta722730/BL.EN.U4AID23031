import type { Metadata } from "next";
import { ThemeContextProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "Campus Notify — Notification Microservice",
  description: "A modern campus notifications dashboard for Events, Results, and Placements.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts — Inter */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <ThemeContextProvider>{children}</ThemeContextProvider>
      </body>
    </html>
  );
}
