import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { logoutAction } from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";

const LogoutButton = () => {
	const { pending } = useFormStatus();
	const [, dispatch] = useFormState(logoutAction); // Removed errorMessage since there's no initial state

	const handleSubmit = async (event) => {
		event.preventDefault(); // Prevent form submission
		await dispatch(); // Dispatch the logout action
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<Button className='bg-black text-white rounded-full p-3 text-xs md:text-sm' disabled={pending} aria-disabled={pending}>
					<LogOut className='cursor-pointer' />
				</Button>
			</form>
		</>
	);
};

export default LogoutButton;
