import React from "react";
import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Furnscape</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">
        {/* <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div> */}
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
