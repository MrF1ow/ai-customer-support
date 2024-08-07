import type { IconType } from 'react-icons';

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