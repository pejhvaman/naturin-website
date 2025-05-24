// import { unstable_noStore as noStore } from "next/cache";
import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";

async function CabinsList({ filter }) {
  // noStore();

  const cabins = await getCabins();

  if (!cabins.length) return null;

  let cabinsToDisplay;

  if (filter === "all") cabinsToDisplay = cabins;
  if (filter === "small")
    cabinsToDisplay = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  if (filter === "medium")
    cabinsToDisplay = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );
  if (filter === "large")
    cabinsToDisplay = cabins.filter(
      (cabin) => cabin.maxCapacity >= 8 && cabin.maxCapacity <= 12
    );

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabinsToDisplay.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinsList;
