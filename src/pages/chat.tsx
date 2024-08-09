import type { NextPage } from "next";
import { useState } from "react";


import ChatContainer from "@/components/chat-container";
import MessageBar from "@/components/message-bar";
import ChatBox from "@/components/chat-box";

const Chat: NextPage = () => {

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Message sent!");
  };

  return (
    <ChatContainer>
      <ChatBox />
      <div className="w-full flex justify-center items-center mx-auto py-2 px-4">
        <MessageBar />
      </div>
    </ChatContainer>
  );
};

export default Chat;
