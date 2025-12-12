import Logo from "./Logo";
import Navigation from "./Navigation";

function Header() {
  return (
    <header className="fixed top-0 w-full bg-primary-900/15 backdrop-blur-md px-4 py-6 sm:px-8 sm:py-5 overflow-hidden z-[100]">
      <div className="flex justify-between items-center max-w-7xl mx-auto ">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
