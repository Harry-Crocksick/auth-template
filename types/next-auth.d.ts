import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    password: string;
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface Session {
    user: {
      email: string;
    };
  }
}
