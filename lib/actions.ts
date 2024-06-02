"use server";

import { signIn, signOut } from "@/auth";

export async function authAction() {
    try {
        await signIn("github");
    } catch (error: any) {
        if(error.message === "NEXT_REDIRECT") {
            throw error;
        }
        return error.message;
    }
    
}

export async function logoutAction() {
    try {
        await signOut();
    } catch (error: any) {
        if(error.message === "NEXT_REDIRECT") {
            throw error;
    }
    return error.message;
   
}
}