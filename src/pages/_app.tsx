import type { AppProps } from "next/app";
import React from "react";

import { initFirebase } from "@/firebase/firebaseApp";
import RootLayout from "@/components/layout";
import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  initFirebase();

  return (
    <>
      <Head>
        <title>AI Pal</title>
        <meta
          name="description"
          content="Your friend in the digital world"
        />
      </Head>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </>
  );
}

export default MyApp;
