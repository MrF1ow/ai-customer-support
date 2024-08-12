import MessageContainer from "./message-container";
import { useEffect, useState, useRef } from "react";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { selectChatHistory, fetchAiMessage } from "@/redux/slices/chatSlice";
import { IMessage } from "@/types";

const ChatBox = () => {
  const dispatch = useDispatch<any>();

  const chatHistoryFromStore = useAppSelector(selectChatHistory);

  const [chatHistory, setChatHistory] = useState<IMessage[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  const prevChatHistoryLengthRef = useRef<number>(0);

  useEffect(() => {
    setChatHistory(chatHistoryFromStore);
    if (
      chatHistoryFromStore.length > prevChatHistoryLengthRef.current &&
      chatHistoryFromStore[chatHistoryFromStore.length - 1].role === "user"
    ) {
      dispatch(fetchAiMessage(chatHistoryFromStore));
    }
  }, [chatHistoryFromStore]);

  useEffect(() => {
    if (containerRef.current) {
      const heightShift = containerRef.current.scrollHeight + 100;
      containerRef.current.scrollTop = heightShift;
    }
  }, [chatHistory]);

  if (!chatHistory) return null;

  return (
    <div
      ref={containerRef}
      className="w-full h-5/6 flex flex-grow overflow-y-auto justify-center"
    >
      <MessageContainer history={chatHistory} />
    </div>
  );
};

export default ChatBox;
