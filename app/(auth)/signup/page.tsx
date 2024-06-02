import Image from "next/image";
import Link from "next/link";
import SignupCard from "./signup-card";

export default async function Signup() {
	return (
		<>
				<h1 className='text-2xl font-bold text-center mb-4'>Sign up to SnapNext</h1>
                <SignupCard />
        </>  
            )   
		
}