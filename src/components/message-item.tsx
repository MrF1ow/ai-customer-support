import { MessageItemProps } from "@/types";

const MessageItem = ({
  messenger,
  text
}: MessageItemProps) => {
  const chatDirection = messenger === "user" ? "text-right" : "text-left";
  const justifyDirection = messenger === "user" ? "justify-end" : "justify-start";

  const sentFrom = messenger === "user" ? "You" : "AI Pal";
  return (
    <div className={`w-full h-auto flex ${justifyDirection}`}>
      <div className={`w-auto max-w-[48%] flex flex-col gap-2 ${chatDirection}`}>
        <div className="w-full text-white text-sm font-bold">{sentFrom}</div>
        <div
          className={`w-auto h-auto bg-foreground rounded-lg ${chatDirection}`}
        >
          <div className="text-black text-lg bg-white rounded-lg py-2 px-1 w-full">
            {text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
