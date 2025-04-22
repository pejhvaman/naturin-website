import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";
import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  // weight: "400",
});

console.log(josefin);

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
        <div className="flex-1 grid px-8 py-12">
          <main className="w-full max-w-7xl mx-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
