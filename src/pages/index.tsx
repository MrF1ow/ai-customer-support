import type { NextPage } from "next";
import AppButton from "@/components/app-button";

const Index: NextPage = () => {
  return (
    <div className="w-full h-auto flex flex-col justify-center items-center gap-4">
      <h1 className="text-6xl font-bold text-center">Welcome to Your AI Pal</h1>
      <p className="text-center text-3xl">
        Friends aren't texting back? AI Pal is here for you!
      </p>
      <div className="w-full h-auto flex flex-row justify-center items-center gap-x-4">
        <AppButton
          type="button"
          text="Sign In"
          onClick={() => (window.location.href = "/signin")}
          size="lg"
        />
        <AppButton
          type="button"
          text="Sign Up"
          onClick={() => (window.location.href = "/signup")}
          size="lg"
        />
      </div>
    </div>
  );
};

export default Index;
