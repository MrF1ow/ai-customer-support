import MessageContainer from "./message-container";
import { useEffect, useState, useRef } from "react";
import { useAppSelector } from "@/redux/store";
import { selectAiMessages, selectUserMessages } from "@/redux/slices/chatSlice";
import { IMessage } from "@/types";

const ChatBox = () => {
  const aiMessagesFromStore = useAppSelector(selectAiMessages);
  const userMessagesFromStore = useAppSelector(selectUserMessages);

  const [aiMessages, setAiMessages] = useState<IMessage[]>([]);
  const [userMessages, setUserMessages] = useState<IMessage[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAiMessages(aiMessagesFromStore);
    setUserMessages(userMessagesFromStore);
  }, [aiMessagesFromStore, userMessagesFromStore]);

  useEffect(() => {
    if (containerRef.current) {
      const heightShift = containerRef.current.scrollHeight + 100;
      containerRef.current.scrollTop = heightShift;
    }
  }, [aiMessages, userMessages]);

  if (!aiMessages || !userMessages) return null;

  return (
    <div
      ref={containerRef}
      className="w-full h-auto flex flex-grow overflow-y-auto justify-center"
    >
      <MessageContainer direction="left" history={aiMessages} />
      <MessageContainer direction="right" history={userMessages} />
    </div>
  );
};

export default ChatBox;
