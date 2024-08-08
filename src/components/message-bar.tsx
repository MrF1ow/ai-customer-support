import { FaArrowUp } from "react-icons/fa";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addUserMessage, selectUserMessages, clearChat } from "@/redux/slices/chatSlice";

const MessageBar = () => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector(selectUserMessages);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    if (!message) return;
    const newMessage = { message: message, time: time };
    dispatch(addUserMessage(newMessage));
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row w-5/6 justify-center"
    >
      <input
        type="text"
        value={message}
        className="h-10 px-4 border-foreground w-[80%] rounded-tl-lg rounded-bl-lg text-black"
        placeholder="Enter message here..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="h-10 bg-blue-500 text-white w-[20%] rounded-tr-lg rounded-br-lg flex justify-center items-center">
        <button
          type="submit"
          className="w-full h-full flex items-center justify-center"
        >
          <FaArrowUp size={20} />
        </button>
      </div>
    </form>
  );
};

export default MessageBar;
