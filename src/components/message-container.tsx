import { MessageContainerProps } from "@/types";
import TextBubble from "./message-item";
import { useEffect, useState } from "react";

const MessageContainer = ({ history, direction }: MessageContainerProps) => {
  const sender = direction === "left" ? "AI Pal" : "You";
  const [messages, setMessages] = useState(history);

  useEffect(() => {
    setMessages(history);
  }, [history]);

  return (
    <div className={`w-[48%] h-full flex flex-col justify-${direction} gap-4`}>
      {messages.map((message, index) =>
        message ? (
          <TextBubble
            key={index}
            messenger={sender}
            text={message.message}
            time={message.time}
            direction={direction}
          />
        ) : null
      )}
    </div>
  );
};

export default MessageContainer;
