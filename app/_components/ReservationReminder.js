"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { useReservation } from "../contexts/ReservationContext";

function ReservationReminder() {
  const { range, resetRange } = useReservation();

  if (!range.from || !range.to) return null;

  return (
    <div className="w-11/12 sm:w-4/5 md:w-fit fixed bottom-6 left-1/2 -translate-x-1/2 py-4 px-2 md:py-5 md:px-8 rounded-lg md:rounded-full bg-accent-500 text-primary-800 font-semibold shadow-xl shadow-slate-900 flex justify-around sm:justify-evenly gap-2 sm:gap-4 md:gap-6 items-center">
      <p className="text-justify">
        <span className="hidden sm:inline-block">👋</span> Don&apos;f forget to
        reserve your dates <br /> from{" "}
        {format(new Date(range.from), "MMM dd yyyy")} to{" "}
        {format(new Date(range.to), "MMM dd yyyy")}
      </p>
      <button className="rounded-full p-1 hover:bg-accent-600 transition-all">
        <XMarkIcon className="h-5 w-5" onClick={resetRange} />
      </button>
    </div>
  );
}

export default ReservationReminder;
