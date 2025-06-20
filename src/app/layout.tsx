import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jarvis Assistant",
  description: "Gestione finanze personali e liste spesa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
     return (
      <html lang="it">
        <body className="flex">
          <nav className="w-48 min-h-screen bg-gray-100 p-4 space-y-2">
            <a href="/" className="block font-semibold">Home</a>
            <a href="/finanze" className="block">Finanze</a>
            <a href="/spese" className="block">Spese</a>
            <a href="/liste-spesa" className="block">Liste Spesa</a>
            <a href="/stock" className="block">Stock</a>
          </nav>
          <main className="flex-1">{children}</main>
        </body>
      </html>
    );ren}</body>
    </html>
  );
}
