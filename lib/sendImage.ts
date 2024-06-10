import { useRouter } from "next/router";
import { readFileAsDataURL } from "@/lib/utils";
import { sendMessageAction } from "@/lib/actions";

export const useSendImage = () => {
    const router = useRouter();

    const sendImage = async (receiverId: string, file: File) => {
        try {
            const base64Image = await readFileAsDataURL(file);
            await sendMessageAction(receiverId, base64Image, "image");
            router.push(`/chat/${receiverId}`);
        } catch (error) {
            console.error("Error sending image:", error);
        }
    };

    return sendImage;
};
