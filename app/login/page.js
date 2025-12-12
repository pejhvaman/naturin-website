import SignInButton from "../_components/SignInButton";
import { auth } from "../_lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (session?.user) redirect("/");
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-xl md:text-3xl font-semibold">
        Sign in to access your guest area
      </h2>
      <SignInButton provider="google" />
      <SignInButton provider="github" />
    </div>
  );
}
