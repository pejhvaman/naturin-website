import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Github({
      clientId: process.env.AUTH_GITHUB_ID, //-> from github-> settings-> developer settings
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    // Credentials({
    //   name: "Credentials",
    //   credentials: {
    //     // for default page->api/auth/signin
    //     email: { label: "Email", type: "email" },
    //     password: { label: "Password", type: "password" },
    //   },

    //   authorize: async (credentials) => {
    //     // we can create a login action that uses signIn function from this file!
    //     const email = credentials.email as string | undefined;
    //     const password = credentials.password as string | undefined;

    //     if (!email || !password) {
    //       throw new CredentialsSignin(
    //         "Please provide both email and password!"
    //       );
    //     }

    //     // communicate with backend and database!
    //     const existingGuest = await getGuest(email);

    //     if (!existingGuest) {
    //       throw new Error("Invalid email or password");
    //     }

    //     // if (!existingGuest.password) { // we have created user in register function in action file!
    //     //   throw new Error("Invalid email or password");
    //     // }

    //     // const isMatched = await compare(password, existingGuest.password) // compare and hash functions are coming from cryptojs package

    //     // is(!isMatched) {
    //     // throw new Error('Password did not mathched');
    //     // }

    //     const userDate = {
    //       firstName: existingGuest.firstName,
    //       lastName: existingGuest.lastName,
    //       email: existingGuest.email,
    //       id: existingGuest.id,
    //     };

    //     return userDate;
    //   },
    // }),
  ],

  // to config existing behavior of session
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      // to change existing behavior of signIn
      // if (account?.provider === "google") {
      //   try {
      //     const { email, name, image, id } = user;

      //get user from database-> if it not exist-> create new user

      //const existingUser = await User.findOne({email})
      //if(!existingUser) {
      // await User.create({email, name, image, authProviderId: id}) -> authProviderId: for remember the provider method
      // } else { return true;}

      // } catch (error) {
      //   throw new Error("Error while creating user");
      // }
      // }

      // if (account?.provider === "credentials") {
      //   return true;
      // } else return false;

      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name });

        return true;
      } catch {
        return false;
      }
    },

    async session({ session, token }) {
      // if(token?.sub && token?.role) { // role is one of user's field!
      //   session.user.id = token.sub;
      //   session.user.role = token.role
      // }
      //  return session;

      const guest = await getGuest(session.user.email);

      session.user.guestId = guest.id;

      return session;
    },

    // async jwt({ token, user }) {
    //   if (user) {
    //     token.role = user.role;
    //   }

    //   return token;
    // },
  },

  pages: {
    signIn: "/login", // to have our custom signin page!
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
