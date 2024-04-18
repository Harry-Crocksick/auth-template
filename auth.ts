import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

type CredentialProps = {
  email: string;
  password: string;
};

export const authConfig = {
  pages: {
    signIn: "/auth/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    Google,
    Github,
    Credentials({
      authorize: async (credentials) => {
        const { email, password } = credentials as CredentialProps;
        if (email === "marnhtetzan11@gmail.com" && password === "12345678") {
          return {
            email,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    session({ session, token }) {
      session.user.email = token.email as string;
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  debug: true,
});
