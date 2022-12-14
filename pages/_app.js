import "../styles/globals.scss";
import { Layout } from "../components";
import { AuthContextProvider } from "../context/AuthContext";
import { StateContext } from "../context/StateContext";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <AuthContextProvider>
        <Layout>
          <Toaster position="bottom-right" reverseOrder={false} />
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </StateContext>
  );
}

export default MyApp;
