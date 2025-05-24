"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeFilter = searchParams.get("capacity") ?? "all";

  const handleFilter = (filter) => {
    const params = new URLSearchParams(searchParams); // web api to mutate search params

    params.set("capacity", filter); // just sets the param

    router.replace(`${pathname}?${params.toString()}`, { scroll: false }); // programatic navigate
  };

  return (
    <div className="border border-primary-700">
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
      className={`py-3 px-5 hover:bg-primary-700 cursor-pointer transition-colors ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
    >
      {children}
    </button>
  );
}

export default Filter;
