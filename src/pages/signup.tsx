import type { NextPage } from "next";
import React, { useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "next/router";
import { FaGoogle } from "react-icons/fa";

import { useAppDispatch } from "@/redux/store";
import { setAuthState, setUser } from "@/redux/slices/authSlice";
import Authentication from "@/components/authentication";
import ProviderButton from "@/components/provider-button";

const SignUp: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const [displayName, setDisplayName] = useState<string | undefined>();

  const registerUserWithEmailAndPassword = async (
    email: string,
    password: string,
  ) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;
      if (user) {

        if (displayName){
          await updateProfile(user, {displayName: displayName});
        }

        dispatch(setAuthState(true));
        dispatch(
          setUser({
            email: user.email as string,
            uid: user.uid as string,
            displayName:  user.displayName as string | undefined,
            photo: user.photoURL as string | undefined,
          })
        );
        router.push("/chat");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithProvider = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        dispatch(setAuthState(true));
        dispatch(
          setUser({
            email: result.user.email as string,
            uid: result.user.uid as string,
            displayName: result.user.displayName as string | undefined,
            photo: result.user.photoURL as string | undefined,
          })
        );
        router.push("/chat");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUpForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setDisplayName(`${data.get("first_name")} ${data.get("last_name")}`);
    registerUserWithEmailAndPassword(
      data.get("email") as string,
      data.get("password") as string
    );
  };

  return (
    <Authentication>
      <h1 className="text-2xl font-bold text-center my-4">Sign Up</h1>
      <form
        className="flex flex-col space-y-4 text-black"
        onSubmit={handleSignUpForm}
      >
        <div className="flex flex-row justify-between">
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            className="p-2 border border-gray-300 rounded w-[48%]"
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            className="p-2 border border-gray-300 rounded w-[48%]"
          />
        </div>
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
          Sign Up
        </button>
      </form>
      <div className="w-full h-auto flex justify-center items-center my-4">
        <ProviderButton Icon={FaGoogle} onClick={signInWithProvider} />
      </div>
      <div>
        <p>
          Already have an account?{" "}
          <a
            href="/signin"
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Sign In
          </a>
        </p>
      </div>
    </Authentication>
  );
};

export default SignUp;
