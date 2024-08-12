import { CiLock } from "react-icons/ci";
import CircleIcon from "./circle-icon";

export default function Authentication({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full md:w-2/3 lg:w-1/2 xl:w-1/3 h-auto py-4 px-2">
      <div className="flex items-center justify-center w-full">
        <CircleIcon Icon={CiLock} />
      </div>
      {children}
    </div>
  );
}
