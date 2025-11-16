"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { signInSchema, signUpSchema } from "@/lib/validation";
import { redirect } from "next/navigation";

import { headers } from "next/headers";

export async function SignInWithEmail(formData: FormData) {
  const rawData = {
    email: String(formData.get("email")),
    password: String(formData.get("password")),
  };

  const validatedData = signInSchema.safeParse(rawData);
  if (!validatedData.success)
    return {
      success: false,
      message: validatedData.error.issues.at(0)?.message || "Invalid Data",
    };
  const { email, password } = validatedData.data;
  try {
    const res = await auth.api.signInEmail({
      headers: await headers(),
      body: { email, password },
      asResponse: true,
    });
    if (!res.ok) {
      return { success: false, message: "Invalid Email or Password" };
    }
    return { success: true, message: "Logged In Sucessfully" };
  } catch (error) {
    if (error instanceof Error)
      return { success: false, message: "Oops! Something went wrong" };
    return { success: false, message: "Internal Server Error" };
  }
}

export async function SignUpEmail(formData: FormData) {
  const rawData = {
    name: String(formData.get("name")),
    email: String(formData.get("email")),
    password: String(formData.get("password")),
  };
  const validatedData = signUpSchema.safeParse(rawData);
  if (!validatedData.success)
    return {
      success: false,
      message: validatedData.error.issues.at(0)?.message || "Invalid Data",
    };
  const { name, email, password } = validatedData.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUser)
      return { success: false, message: "User already exist with this email" };

    const res = await auth.api.signUpEmail({
      headers: await headers(),
      body: {
        name,
        email,
        password,
      },
      asResponse: true,
    });
    if (!res.ok) {
      let message = "Failed";
      if (res.status == 422) {
        message = "User already exists with this email";
      } else {
        message = "Signup failed, please try again";
      }
      return { success: false, message: message };
    }
    return { success: true, message: "Signed Up Successfully" };
  } catch (error) {
    console.error("Signup Error:", error);
    return { success :false , message: "Oops! Something went wrong while signing up." };
  }
}

export async function SignOutEmail() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch (error) {
    console.error("Sign-out failed:", error);
    return { error: "Oops! Something went wrong while signing out." };
  }
  redirect("/sign-in");
}

