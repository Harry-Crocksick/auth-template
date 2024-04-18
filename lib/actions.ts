"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export async function signInUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    await signIn("credentials", { email, password });
    console.log("Logged in successfully...!");
  } catch (err) {
    console.error(err);
  }
  redirect("/");
}
