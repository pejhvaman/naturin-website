"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams(); // current parms
  const router = useRouter(); // to navigate programatically
  const pathname = usePathname(); // // also used before to highlighte active nav in sidemenu
  const activeFilter = searchParams.get("capacity") ?? "all";

  const handleFilter = (filter) => {
    const params = new URLSearchParams(searchParams); // web api to mutate search params

    params.set("capacity", filter); // just sets the param (also there is .delete and ...)

    router.replace(`${pathname}?${params.toString()}`, { scroll: false }); // programatic navigate
  };

  return (
    <div className="border border-primary-700 text-base md:text-lg">
      <Button
        filter="all"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        All Cabins
      </Button>
      <Button
        filter="small"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        1&mdash;3
      </Button>
      <Button
        filter="medium"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        4&mdash;7
      </Button>
      <Button
        filter="large"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        8&mdash;12
      </Button>
    </div>
  );
}

function Button({ filter, activeFilter, handleFilter, children }) {
  return (
    <button
      onClick={() => handleFilter(filter)}
      className={`py-2 px-3.5 sm:py-3 sm:px-5 hover:bg-primary-700 cursor-pointer transition-colors ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
    >
      {children}
    </button>
  );
}

export default Filter;
