"use client";

import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);

  const close = () => setIsOpen(false);

  const toggle = () => setIsOpen((is) => !is);

  return (
    <SidebarContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

function useSidebar() {
  const value = useContext(SidebarContext);

  if (value === undefined)
    throw new Error("context is used outside its provider!");

  return value;
}

export { SidebarProvider, useSidebar };
