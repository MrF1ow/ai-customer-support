import type { NextPage } from "next";
import React from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/router";
import { FaGoogle } from "react-icons/fa";

import { useAppDispatch } from "@/redux/store";
import { setAuthState, setUser } from "@/redux/slices/authSlice";
import Authentication from "@/components/authentication";
import ProviderButton from "@/components/provider-button";

const SignIn: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const signInWithProvider = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        dispatch(setAuthState(true));
        dispatch(
          setUser({
            email: result.user.email as string,
            uid: result.user.uid as string,
          })
        );
        router.push("/chat");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result.user);
      if (result.user) {
        dispatch(setAuthState(true));
        dispatch(
          setUser({
            email: result.user.email as string,
            uid: result.user.uid as string,
          })
        );
        router.push("/chat");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignInForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    signInWithEmail(
      data.get("email") as string,
      data.get("password") as string
    );
  };

  return (
    <Authentication>
      <h1 className="text-2xl font-bold text-center my-4">Sign In</h1>
      <form
        className="flex flex-col space-y-4 text-black"
        onSubmit={handleSignInForm}
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Sign In
        </button>
      </form>
      <div className="w-full h-auto flex justify-center items-center my-4">
        <ProviderButton Icon={FaGoogle} onClick={signInWithProvider} />
      </div>
      <div>
        <p>
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Sign Up
          </a>
        </p>
      </div>
    </Authentication>
  );
};

export default SignIn;
