"use client";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Loader2 } from "lucide-react";

const DeleteMessagesButton = () => {
	return (
		<form className='flex flex-col'>
			<DeleteButton />
		</form>
	);
};
export default DeleteMessagesButton;

function DeleteButton() {
	const pending = false;
	return (
		<Button className='bg-sigButtonSecondary  hover:bg-sigButtonSecondaryHover w-12 h-12 rounded-full '>
			{!pending ? <Trash /> : <Loader2 className='h-4 w-4 animate-spin' />}
		</Button>
	);
}