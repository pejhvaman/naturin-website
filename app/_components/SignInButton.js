import { signInAction } from "../_lib/actions";
import { signIn } from "../_lib/auth";

function SignInButton({ provider }) {
  if (provider === "google")
    return (
      <form action={signInAction}>
        <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium cursor-pointer hover:bg-primary-800 transition-colors">
          <img
            src="https://authjs.dev/img/providers/google.svg"
            alt="Google logo"
            height="24"
            width="24"
          />
          <span>Continue with Google</span>
        </button>
      </form>
    );

  if (provider === "github")
    return (
      <form
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
        <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium cursor-pointer hover:bg-primary-800 transition-colors">
          <img
            src="https://authjs.dev/img/providers/github.svg"
            alt="Giyhub logo"
            height="24"
            width="24"
            className="border bg-white rounded-full"
          />
          <span>Continue with Github</span>
        </button>
      </form>
    );
}

export default SignInButton;
