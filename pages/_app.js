import "../styles/globals.css";
import { Layout } from "../components";
import { AuthContextProvider } from "../context/AuthContext";
import { StateContext } from "../context/StateContext";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <StateContext>
        <Layout>
          <Toaster position="bottom-right" reverseOrder={false} />
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    </AuthContextProvider>
  );
}

export default MyApp;
