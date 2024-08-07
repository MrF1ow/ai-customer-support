import { ProviderButtonProps } from "@/types";
import CircleIcon from "./circle-icon";

const ProviderButton: React.FC<ProviderButtonProps> = ({ Icon, onClick }) => {
  return (
    <button
      className="flex items-center w-full justify-center py-2 px-4 bg-white text-black rounded shadow-md"
      onClick={onClick}
    >
      <CircleIcon Icon={Icon} />
    </button>
  );
};

export default ProviderButton;
