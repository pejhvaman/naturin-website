import { auth } from "../_lib/auth";

async function Page() {
  const session = await auth();
  console.log(session);

  const firstName = session.user.name.split(" ").at(0);

  return (
    <h1 className="text-2xl mb-10 text-accent-400 font-medium">
      Welcome {firstName}
    </h1>
  );
}

export default Page;
