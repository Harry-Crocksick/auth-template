import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

export const authConfig = {
  pages: {
    signIn: "/auth/sign-in",
  },
  providers: [
    Google,
    Github,
    Credentials({
      credentials: {
        username: {
          title: "Username",
          type: "text",
        },
        email: {
          title: "Email",
          type: "email",
        },
        password: {
          title: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        const { username, email, password } = credentials;
        if (email === "marnhtetzan11@gmail.com" && password === "123456") {
          return {
            name: username as string,
            email: email,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.name = user.name;
      }
      return token;
    },
    session({ session, token }) {
      session.user.name = token.name;
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  debug: true,
});
