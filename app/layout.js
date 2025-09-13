import "./globals.css";

import ClientProvider from "./components/ClientProvider";
import Header from "./components/Header";

export const metadata = {
  title: "My App",
  description: "Next.js App Router Example",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-red-300">
        <ClientProvider>
          <Header />
          <main className="pt-4">{children}</main>
        </ClientProvider>
      </body>
    </html>
  );
}
