import React from "react";
import "../styles/globals.scss";
import { Layout } from "../components";
import { AuthContextProvider } from "../context/AuthContext";
import { StateContext } from "../context/StateContext";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="./favicon.ico" />
      </Head>
      <StateContext>
        <AuthContextProvider>
          <Layout>
            <Toaster position="bottom-right" reverseOrder={false} />
            <Component {...pageProps} />
          </Layout>
        </AuthContextProvider>
      </StateContext>
    </>
  );
}

export default MyApp;
