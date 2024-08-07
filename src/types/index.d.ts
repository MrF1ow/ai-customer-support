import type { IconType } from 'react-icons';

interface AppButtonProps {
    type: "button" | "submit" | "reset";
    text: string;
    onClick?: () => void;
}

interface ProviderButtonProps {
    Icon: IconType;
    onClick: () => void;
}