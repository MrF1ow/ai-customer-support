import type { IconType } from "react-icons";

interface AppButtonProps {
  type: "button" | "submit" | "reset";
  text: string;
  onClick?: () => void;
  size: "sm" | "md" | "lg" | "xl";
}

interface ProviderButtonProps {
  Icon: IconType;
  onClick: () => void;
}

interface IMessage {
  message: string;
  time: string;
}

interface IChatState {
  aiMessages: IMessage[];
  userMessages: IMessage[];
}

interface MessageItemProps {
  messenger: string;
  text: string;
  time: string;
  direction: "left" | "right";
  // image: string;
}

interface MessageContainerProps {
  history: IMessage[] | [];
  direction: "left" | "right";
}

interface MessageBarProps {
  onSubmit: () => void;
}