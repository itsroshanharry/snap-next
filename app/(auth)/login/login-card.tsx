"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { authAction } from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";

export default function LoginCard() {
    // async function authAction() {
    //     await signIn("github");
    // }

	const [errorMessage, dispatch] = useFormState(authAction, "");

	return (
		<>
			<form action={dispatch} className='space-y-4'>
				<LoginButton />
			</form>
			<div className='mt-4 text-center text-[13px]'>
				<span>New To SnapNext? </span>
				<Link className='text-blue-500 hover:underline text-[13px] mr-1' href='/signup'>
					Sign Up
				</Link>
				{errorMessage ? <p className="text-sm text-red-500">{errorMessage}</p> : null}
			</div>
		</>
	);
}

function LoginButton() {
	const {pending} = useFormStatus();

	return (
		<Button className='w-full flex gap-2' disabled = {pending} aria-disabled={pending}>
			<Image src={"/github.svg"} width={20} height={20} alt='Github logo' /> Log in with Github
		</Button>
	);
}