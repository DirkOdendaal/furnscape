import React, { useEffect } from "react";
import { ErrorPage } from "../components";
import { useStateContext } from "../context/StateContext";

const FourOhFour = () => {
  const { setError } = useStateContext();
  const error = {
    errorTitle: "404",
    p1: "It seems you have lost your way.",
    p2: "Try going back to our home page.",
  };

  useEffect(() => {
    setError(true);
  }, []);

  return <ErrorPage error={error} />;
};

export default FourOhFour;
