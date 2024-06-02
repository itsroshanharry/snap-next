"use client";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { logoutAction } from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";


const LogoutButton = () => {
	const {pending} = useFormStatus();
	const [errorMessage, dispatch] = useFormState(logoutAction, "");

	return (
		<>
		<form action={dispatch}>
			<Button className='bg-black text-white rounded-full p-3 text-xs md:text-sm' disabled = {pending} aria-disabled={pending}>
				<LogOut className='cursor-pointer' />
			</Button>
		</form>
		{errorMessage ? <p className="text-sm text-red-500">{errorMessage}</p> : null}
		</>
	);
};
export default LogoutButton;