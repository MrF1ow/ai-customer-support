import { MessageContainerProps } from "@/types";
import MessageItem from "./message-item";
import { useEffect, useState } from "react";

const MessageContainer = ({ history }: MessageContainerProps) => {
  const [messages, setMessages] = useState(history);

  useEffect(() => {
    setMessages(history);
  }, [history]);

  return (
    <div className={`w-full h-full flex flex-col gap-4`}>
      {messages.map((message, index) =>
        message ? (
          <MessageItem
            key={index}
            messenger={message.role}
            text={message.content}
          />
        ) : null
      )}
    </div>
  );
};

export default MessageContainer;
