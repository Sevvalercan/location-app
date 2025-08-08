import "@/styles/globals.css";
import { LocationsProvider } from "@/context/LocationsContext";

export const metadata = {
  title: "Konum App",
  description: "Konum kaydetme uygulaması",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <LocationsProvider>{children}</LocationsProvider>
      </body>
    </html>
  );
}
