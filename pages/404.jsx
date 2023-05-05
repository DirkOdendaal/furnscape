import React, { useEffect } from "react";
import { Error } from "../components";
import { useStateContext } from "../context/StateContext";

const FourOhFour = () => {
  const { setError } = useStateContext();
  const error = {
    errorTitle: "404",
    p1: "It looks like the developer fell asleep.",
    p2: "He dreams of having a database that's free. ",
    p3: "Seeing Firebase has a call limit thats it for today. ",
  };

  useEffect(() => {
    setError(true);
  }, []);

  return <Error error={error} />;
};

export default FourOhFour;
