import type { NextPage } from "next";
import React, { useState } from "react";
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
import { FirebaseError } from "firebase/app";

const SignIn: NextPage = () => {
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const handleLoginError = () => {
    setInvalidCredentials(true);
    setTimeout(() => {
      setInvalidCredentials(false);
    }, 5000);
  }

  const signInWithProvider = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        console.log(result);
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
            displayName: result.user.displayName as string | undefined,
            photo: result.user.photoURL as string | undefined,
          })
        );
        router.push("/chat");
      }
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code === "auth/invalid-credential"
      ) {
        handleLoginError();
      } else {
        console.log(error);
      }
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
      <div className="w-full h-auto">
        <h1 className="text-2xl font-bold text-center my-4">Sign In</h1>
        {invalidCredentials && (<div className="w-full bg-red-400 border-red-600 text-white font-bold py-2 px-4 rounded my-4">Invalid Email and/or Password. Please Try Again!</div>)}
      </div>
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
