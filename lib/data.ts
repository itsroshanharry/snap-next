import Message, { IMessageDocument } from "@/models/messageModel"
import User, { IUserDocument } from "@/models/userModel"
import { connectToMongoDB } from "./db"
import Chat, { IChatDocument } from "@/models/chatModel"
import { unstable_cache as noStore, unstable_noStore } from "next/cache"



export const getUsersForSidebar = async(authUserId: string) => {
    unstable_noStore();
    try {
        const allUsers : IUserDocument[]= await User.find({_id: { $ne: authUserId}})
        const userInfo = await Promise.all(
            allUsers.map(async (user) => {
                const lastMessage: IMessageDocument | null = await Message.findOne({
                    $or:[{sender:user._id, receiver: authUserId},
                         {sender:authUserId, receiver: user._id} 
                    ],
                }).sort({createdAt:-1})
                .populate("sender", "fullname avatar _id")
                .populate("receiver", "fullname avatar _id")
                .exec()

                return {
                    _id: user._id,
                    participants: [user],
                    lastMessage: lastMessage
                    ? {
                        ...lastMessage.toJSON(),
                        sender: lastMessage.sender,
                        receiver: lastMessage.receiver

                    } 
                    : null,
                }
            })
        )
        return userInfo;
    } catch (error) {
        console.log("Error in getUsersForSidebar", error)
        throw error
        
    }
} 

export const getUsersProfile = async (userId: string) => {
    unstable_noStore();
    try {
        await connectToMongoDB();
        const user:IUserDocument | null = await User.findById(userId);
        if(!user) throw new Error("User not found");
        return user;
    } catch (error) {
        console.log("Error in getUsersProfile", error);
        throw error;
    }
}

export const getMessages = async (authUserId: string, otherUserId: string) => {
    unstable_noStore();
    try {
        await connectToMongoDB();

         const chat:IChatDocument | null = await Chat.findOne({
            participants: {$all: [authUserId, otherUserId]},
         }).populate({
            path : "messages",
            populate: {
                path: "sender",
                model: "User",
                select: "fullname",
            },
         });
         if(!chat) return [];
         const messages = chat.messages;
         return JSON.parse(JSON.stringify(messages));

    } catch (error) {
        console.log("Error in getMessages", error);
        throw error;
    }
}