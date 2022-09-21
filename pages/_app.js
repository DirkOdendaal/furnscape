import "../styles/globals.css";
import { Layout } from "../components";
import { AuthContextProvider } from "../context/AuthContext";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Layout>
        <Toaster position="bottom-right" reverseOrder={false} />
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}

export default MyApp;
