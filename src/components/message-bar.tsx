import { FaArrowUp } from "react-icons/fa";
import { useState } from "react";

import { useAppDispatch } from "@/redux/store";
import { addMessage } from "@/redux/slices/chatSlice";
import { IMessage } from "@/types";

const MessageBar = () => {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) return;
    const newMessage: IMessage = { role: "user", content: message };
    dispatch(addMessage(newMessage));
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row w-full md:w-5/6 justify-center"
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
