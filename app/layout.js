import "./globals.css";

export const metadata = {
  title: "Isabel te amo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
