"use client";
import Image from "next/image";
import { EmojiPopover } from "./emoji-popover";
import { TextMessageSent } from "../svgs/chatSvg";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState, useRef } from "react";
import { sendMessageAction } from "@/lib/actions";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { readFileAsDataURL } from "@/lib/utils";  // Importing the utility function

const SendMsgInput = () => {
	const [messageContent, setMessageContent] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const params = useParams<{ id: string }>();
	const router = useRouter();
	const receiverId = params.id;
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			if (receiverId) {
				await sendMessageAction(receiverId, messageContent, "text");
				setMessageContent("");
			} else {
				console.error("Receiver ID is undefined");
			}
		} catch (error) {
			console.error("Error sending message:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSendImage = async (file: File) => {
		setIsLoading(true);
		try {
			if (receiverId) {
				const base64Image = await readFileAsDataURL(file);
				await sendMessageAction(receiverId, base64Image, "image");
				router.push(`/chat/${receiverId}`);
			} else {
				console.error("Receiver ID is undefined");
			}
		} catch (error) {
			console.error("Error sending image:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			await handleSendImage(e.target.files[0]);
		}
	};

	const handleClick = () => {
		fileInputRef.current?.click();
	};

	return (
		<div className='flex gap-2 items-center py-1'>
			<input
				type="file"
				accept="image/*"
				style={{ display: 'none' }}
				ref={fileInputRef}
				onChange={handleImageChange}
			/>
			<div 
				className='cursor-pointer w-10 h-10 rounded-full flex items-center justify-center bg-sigBackgroundSecondaryHover' 
				onClick={handleClick}
			>
				<Image
					src={"/camera.svg"}
					height={0}
					width={0}
					style={{ width: "20px", height: "auto" }}
					alt='camera icon'
				/>
			</div>
			<form
				onSubmit={handleSendMessage}
				className='flex-1 flex items-center gap-1 bg-sigBackgroundSecondaryHover rounded-full border border-sigColorBgBorder'
			>
				<Input
					placeholder='Send a chat'
					className='bg-transparent focus:outline-transparent border-none outline-none w-full h-full rounded-full'
					type='text'
					value={messageContent}
					onChange={(e) => {
						setMessageContent(e.target.value);
					}}
					disabled={isLoading}
				/>
				<Button size={"sm"} className='bg-transparent hover:bg-transparent text-sigSnapChat' type='submit'>
					{!isLoading && <TextMessageSent className='scale-150 mr-1' />}
					{isLoading && <Loader2 className='h-6 w-6 animate-spin' />}
				</Button>
			</form>
			<div className='cursor-pointer w-10 h-10 rounded-full flex items-center justify-center text-white bg-sigBackgroundSecondaryHover'>
				<EmojiPopover />
			</div>
		</div>
	);
};
export default SendMsgInput;
