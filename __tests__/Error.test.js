import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Error from "../components/Error";

describe("Error component", () => {
  it("renders error message", () => {
    const error = {
      errorTitle: "Error!",
      p1: "Something went wrong.",
      p2: "Please try again later.",
      p3: "",
      p4: "",
    };
    const { getByText } = render(<Error error={error} />);
    expect(getByText("Error!")).toBeInTheDocument();
    expect(getByText("Hmmm...")).toBeInTheDocument();
    expect(getByText("Something went wrong.")).toBeInTheDocument();
    expect(getByText("Please try again later.")).toBeInTheDocument();
  });
});
