import { MessageItemProps } from "@/types";

const MessageItem = ({
  messenger,
  text,
  time,
  direction,
}: MessageItemProps) => {
  const chatDirection = direction === "left" ? "text-left" : "text-right";
  const justifyDirection =
    direction === "left" ? "justify-start" : "justify-end";

  return (
    <div className={`w-full h-auto flex ${justifyDirection}`}>
      <div className={`w-auto flex flex-col gap-2 ${chatDirection}`}>
        <div className="w-full text-white text-sm font-bold">{messenger}</div>
        <div
          className={`w-full h-auto bg-foreground rounded-lg ${chatDirection}`}
        >
          <div className="text-black text-lg bg-white rounded-lg py-2 px-1">
            {text}
          </div>
        </div>
        <div className={`text-white text-xs ${chatDirection}`}>{time}</div>
      </div>
    </div>
  );
};

export default MessageItem;
