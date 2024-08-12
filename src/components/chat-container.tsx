import { useAppDispatch } from "@/redux/store";
import { clearChat } from "@/redux/slices/chatSlice";

export default function ChatContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();

  const handleClearChat = () => {
    dispatch(clearChat());
  };

  return (
<div className="w-full md:w-full lg:w-1/2 xl:w-1/2 h-full md:h-full lg:h-5/6 xl:h-4/5 flex flex-col py-4 px-2 lg:border lg:border-foreground rounded-lg">
  <div className="w-full flex items-center mb-4">
    <button
      onClick={handleClearChat}
      className="bg-red-500 text-white font-semibold rounded-lg px-4 py-2"
    >
      Clear Chat
    </button>
  </div>
  {children}
</div>
  );
}
