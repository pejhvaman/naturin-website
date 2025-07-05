"use client";

import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import SignOutButton from "./SignOutButton";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation({ isOpen, toggleSidebar }) {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <nav
      className={clsx(
        "absolute lg:left-0 -left-[240px] transition-all w-[240px] h-full z-[100] border-r border-primary-900 bg-primary-950 pr-4 md:pr-8",
        {
          "left-0": isOpen,
        }
      )}
    >
      <ul className="flex flex-col gap-2 h-full text-lg">
        {navLinks.map((link) => (
          <li onClick={toggleSidebar} key={link.name}>
            <Link
              className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${
                pathname === link.href ? "bg-primary-900" : ""
              }`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        <li onClick={toggleSidebar} className="mt-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
