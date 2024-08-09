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

type IMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

interface IChatState {
  status: "idle" | "loading" | "failed" | "succeeded";
  chatHistory: IMessage[];
  error: null | string;
}

interface MessageItemProps {
  messenger: string;
  text: string;
  // image: string;
}

interface MessageContainerProps {
  history: IMessage[] | [];
}

interface MessageBarProps {
  onSubmit: () => void;
}