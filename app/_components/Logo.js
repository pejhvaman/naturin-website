import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";

function Logo() {
  return (
    <Link href="/" className="items-center gap-4 z-10 flex">
      <Image
        src={logo}
        height="60"
        width="60"
        quality={90}
        alt="The Naturin logo"
        className="w-8 h-8 shrink-0 sm:w-auto sm:h-auto -translate-y-0.5"
      />
      <span className="text-xl font-semibold text-primary-100 hidden sm:inline-block">
        The Naturin
      </span>
    </Link>
  );
}

export default Logo;
