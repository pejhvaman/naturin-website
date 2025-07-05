"use client";

import SideNavigation from "../_components/SideNavigation";
import clsx from "clsx";
import { useSidebar } from "../contexts/SidebarProvider";

function Layout({ children }) {
  const { isOpen, toggle, close } = useSidebar();

  return (
    <>
      <div className="h-full w-full relative">
        <span
          onClick={toggle}
          className={clsx(
            "absolute -left-5 -top-8 flex justify-center items-center w-8 h-8 rounded-full border-2 border-accent-500 cursor-pointer animate-pulse z-[110] transition-all lg:hidden",
            {
              "left-[220px] !animate-none": isOpen,
            }
          )}
        >
          {isOpen ? "<" : ">"}
        </span>
        <div className="h-full w-full relative overflow-hidden">
          <SideNavigation isOpen={isOpen} toggleSidebar={toggle} />

          <div
            className={clsx(
              "p-4 z-50 ml-auto h-full w-full transition-all lg:w-[calc(100%-240px)]"
            )}
          >
            {children}
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          onClick={close}
          className="bg-primary-950 blur-2xl w-full h-full fixed left-0 top-0 z-50"
        ></div>
      )}
    </>
  );
}

export default Layout;
