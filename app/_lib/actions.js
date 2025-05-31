"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData) {
  const session = await auth();

  if (!session) throw new Error("Make sure you're logged in");

  const [nationality, countryFlag] = formData.get("nationality").split("%");

  const nationalID = formData.get("nationalID");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Provide a valid nationl ID");

  const updateData = { nationalID, nationality, countryFlag };

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

export async function deleteBooking(bookingId) {
  const session = await auth();

  if (!session) throw new Error("You have to login firs!");

  const guestBookings = await getBookings(session.user.guestId);

  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You don't have access to delete this data!");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
  const bookingId = Number(formData.get("bookingId"));

  const session = await auth();

  if (!session) throw new Error("You have to login firs!");

  const guestBookings = await getBookings(session.user.guestId);

  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You don't have access to delete this data!");

  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be updated");

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  redirect("/account/reservations");
}

export async function createBooking(bookingData, formData) {
  // console.log("bookingData=>", bookingData);
  // console.log("formData=>", formData);

  const session = await auth();
  if (!session) throw new Error("Log in first!");

  const newBooking = {
    ...bookingData,
    numGuests: Number(formData.get("numGuests")),
    extraPrice: 0,
    totalPrice: bookingData.cabinPrice,
    status: "unconfirmed",
    observations: bookingData.get("observations").slice(0, 1000),
    isPaid: false,
    hasBreakfast: false,
    guestId: session.user.guestId,
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("This cabin could not be reserved!");

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}
