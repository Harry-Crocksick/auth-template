"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z
  .object({
    firstName: z
      .string({ required_error: "First name must be provided" })
      .trim()
      .regex(new RegExp("^[a-zA-Z0-9_]+$"), {
        message: "Special characters are not allowed",
      })
      .min(2, { message: "First name must be at least 2 characters long" })
      .max(25, { message: "First name must not exceed 25 characters" }),
    lastName: z
      .string({ required_error: "Last name must be provided" })
      .trim()
      .regex(new RegExp("^[a-zA-Z0-9_]+$"), {
        message: "Special characters are not allowed",
      })
      .min(2, { message: "Last name must be at least 2 characters long" })
      .max(25, { message: "Last name must not exceed 25 characters" }),
    email: z
      .string({ required_error: "Email must be provided" })
      .trim()
      .email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormInput = z.infer<typeof FormSchema>;

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(FormSchema),
  });

  const submit: SubmitHandler<FormInput> = (data) =>
    alert(JSON.stringify(data, null, 2));

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="min-h-screen w-full flex justify-center items-center"
    >
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  {...register("firstName")}
                  id="first-name"
                  placeholder="Max"
                />
                <small className="text-xs font-semibold text-red-400">
                  {errors.firstName?.message}
                </small>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  {...register("lastName")}
                  id="last-name"
                  placeholder="Robinson"
                />
                <small className="text-xs font-semibold text-red-400">
                  {errors.lastName?.message}
                </small>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="m@example.com"
              />
              <small className="text-xs font-semibold text-red-400">
                {errors.email?.message}
              </small>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input {...register("password")} id="password" type="password" />
              <small className="text-xs font-semibold text-red-400">
                {errors.password?.message}
              </small>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                {...register("confirmPassword")}
                id="confirmPassword"
                type="password"
              />
              <small className="text-xs font-semibold text-red-400">
                {errors.confirmPassword?.message}
              </small>
            </div>
            <Button type="submit" className="w-full">
              Create an account
            </Button>
            <Button variant="outline" className="w-full" type="submit">
              Sign up with GitHub
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/sign-in" className="underline">
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
