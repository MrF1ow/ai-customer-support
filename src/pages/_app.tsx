"use client";

import type { AppProps } from "next/app";
import React from "react";

import { initFirebase } from "@/firebase/firebaseApp";
import ReduxProvider from "@/redux/redux-provider";
import RootLayout from "@/components/layout";
import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  initFirebase();

  return (
    <>
      <Head>
        <title>AI Pal</title>
        <meta name="description" content="Your friend in the digital world" />
      </Head>
      <ReduxProvider>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </ReduxProvider>
    </>
  );
}

export default MyApp;
