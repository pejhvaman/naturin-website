import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="items-center gap-4 z-10 hidden sm:flex">
      <Image
        src={logo}
        height="60"
        width="60"
        quality={90}
        alt="The Naturin logo"
      />
      <span className="text-xl font-semibold text-primary-100">
        The Naturin
      </span>
    </Link>
  );
}

export default Logo;
