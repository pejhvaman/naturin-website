"use client";

import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteBooking } from "../_lib/actions";

function ReservationList({ bookings }) {
  const [optimisticBookings, optimisticDeleteBooking] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  const handleDeleteBooking = async (bookingId) => {
    optimisticDeleteBooking(bookingId);
    await deleteBooking(bookingId);
  };

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          onDelete={handleDeleteBooking}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
