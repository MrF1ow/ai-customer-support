export default function ChatContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="sm:w-full md:w-full lg:w-1/2 xl:w-1/2 sm:h-full md:h-full lg:h-5/6 xl:h-4/5 flex flex-col py-4 px-2 border border-foreground rounded-lg">
      <h1 className="text-white text-2xl text-center my-4">Chat</h1>
      {children}
    </div>
  );
}
