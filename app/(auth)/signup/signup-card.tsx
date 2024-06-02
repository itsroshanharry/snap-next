import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { authAction } from "@/lib/actions";


export default function SignupCard() {

	// async function authAction() {
	// 	"use server";
	// 	await signIn("github");
	// }
	return (
		<>
			<form action={authAction} className='space-y-4'>
				<SignUpButton />
			</form>
			<div className='mt-4 text-center text-[13px]'>
				<span>Already have an account? </span>
				<Link className='text-blue-500 hover:underline text-[13px] mr-1' href='/login'>
					Log in
				</Link>
			</div>
		</>
	);
}


function SignUpButton() {
	return (
		<Button className='w-full flex gap-2'>
			<Image src={"/github.svg"} width={20} height={20} alt='Github logo' /> Sign up with Github
		</Button>
	);
}