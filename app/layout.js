import "../app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import { ReservationProvider } from "./contexts/ReservationContext";
import { SidebarProvider } from "./contexts/SidebarProvider";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  // weight: "400",
});

export const metadata = {
  title: {
    template: "%s / Naturin",
    default: "Welcome / Naturin",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the wild forest of Kudistan, Iran.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} min-h-screen flex flex-col relative bg-primary-950 text-primary-50`}
      >
        <Header />
        <div className="w-full flex-1 grid px-4 py-28 sm:py-32 md:px-8 md:py-36">
          <main className="w-full max-w-7xl mx-auto">
            <ReservationProvider>
              <SidebarProvider>{children}</SidebarProvider>
            </ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
