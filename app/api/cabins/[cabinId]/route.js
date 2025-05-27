import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
  console.log(request);

  const { cabinId } = params;

  try {
    const [cabins, bookedDated] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    return Response.json({ cabins, bookedDated });
  } catch {
    return Response.json({ message: "Cabin could not be found!" });
  }
}
