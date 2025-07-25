"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "../contexts/ReservationContext";
import clsx from "clsx";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ settings, bookedDates, cabin }) {
  const { range, setRange, resetRange } = useReservation();

  const rangeToDisplay = isAlreadyBooked(range, bookedDates) ? {} : range;

  const { regularPrice, discount } = cabin;

  const numNights = differenceInDays(rangeToDisplay.to, rangeToDisplay.from);

  const cabinPrice = numNights * regularPrice - discount;

  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className={clsx("[&>div]:!mx-auto", {
          selected: "!bg-primary-500",
        })}
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        selected={rangeToDisplay}
        onSelect={setRange}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
      />

      <div className="flex flex-wrap items-center justify-between px-2 md:px-8 py-2 bg-accent-500 text-primary-800">
        <div className="flex items-center gap-2 md:gap-6">
          <p className="flex gap-2 items-center">
            {discount > 0 ? (
              <>
                <span className="text-base md:text-2xl">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-base md:text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-base md:text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-base md:text-lg font-bold uppercase">
                  Total
                </span>{" "}
                <span className="text-base md:text-2xl font-semibold">
                  ${cabinPrice}
                </span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold flex-1 mt-2 md:ml-2"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
