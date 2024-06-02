import { signIn } from "@/auth";

export async function authAction() {
    "use server";
    await signIn("github");
}