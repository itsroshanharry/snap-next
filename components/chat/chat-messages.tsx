"use client";
import { IMessageDocument, IPopulatedMessageDocument } from "@/models/messageModel";
import { Session } from "next-auth";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import mongoose from "mongoose";

type ChatMessageProps = {
  messages: (IMessageDocument | IPopulatedMessageDocument)[];
  session: Session | null;
};

const ChatMessages = ({ messages, session }: ChatMessageProps) => {
  const lastMsgRef = useRef<HTMLDivElement>(null);
  const [isPreviewImage, setIsPreviewImage] = useState({
    open: false,
    imgURL: "",
  });

  useEffect(() => {
    lastMsgRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {messages.map((message, idx) => {
        if (!message) return null;

        const amISender =
          message.sender instanceof mongoose.Types.ObjectId
            ? message.sender.toString() === session?.user?._id
            : message.sender._id.toString() === session?.user?._id;

        const senderFullName =
          message.sender instanceof mongoose.Types.ObjectId
            ? ""
            : message.sender.fullName
            ? message.sender.fullName.toUpperCase()
            : "";

        const isMessageImage = message.messageType === "image";

        const isPrevMessageFromSameSender =
          idx > 0 &&
          messages[idx - 1].sender &&
          (message.sender instanceof mongoose.Types.ObjectId
            ? messages[idx - 1].sender.toString() === message.sender.toString()
            : messages[idx - 1].sender._id.toString() === message.sender._id.toString());

        const handleImageLoad = () => {
          lastMsgRef.current?.scrollIntoView({ behavior: "smooth" });
        };

        return (
          <div key={`${message._id}`} className="w-full" ref={lastMsgRef}>
            {!isPrevMessageFromSameSender && message.sender && (
              <p
                className={`font-bold mt-2 text-xs ${
                  amISender ? "text-sigSnapImg" : "text-sigSnapChat"
                }`}
              >
                {amISender ? "ME" : senderFullName}
              </p>
            )}
            <div
              className={`border-l-2 ${
                amISender ? "border-l-sigSnapImg" : "border-l-sigSnapChat"
              }`}
            >
              <div className={`flex items-center w-1/2 p-2 rounded-sm `}>
			  {isMessageImage && message.content ? (
  <div className="relative">
    <Image
      src={message.content}
      layout="responsive" // Use responsive layout
      width={200} // Adjust width as needed
      height={200} // Adjust height as needed
      className="h-auto w-auto object-cover cursor-pointer"
      alt="Image"
      onLoad={handleImageLoad}
      onClick={() =>
        setIsPreviewImage({
          open: true,
          imgURL: message.content,
        })
      }
    />
  </div>
) : (
  <p className="text-sm">
    {message.content ? message.content : ""}
  </p>
)}

              </div>
            </div>
          </div>
        );
      })}
      <Dialog
        open={isPreviewImage.open}
        onOpenChange={() => setIsPreviewImage({ open: false, imgURL: "" })}
      >
        <DialogContent
          className="max-w-4xl ,h-3/4 bg-sigMain border bg-sigColorBgBorder outline-none"
          autoFocus={false}
        >
          <Image
            src={isPreviewImage.imgURL}
            fill
            className="object-contain p-2"
            alt="Image"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatMessages;