import React from "react";
import { render } from "@testing-library/react";
import { useStateContext } from "../context/StateContext";
import "@testing-library/jest-dom";

import Footer from "../components/Footer";

jest.mock("../context/StateContext", () => ({
  useStateContext: jest.fn(),
}));

describe("Footer", () => {
  it("renders the footer with icons when there is no error", () => {
    useStateContext.mockReturnValue({ error: null });

    const { getByText, getByTestId } = render(<Footer />);

    const textElement = getByText("Furnscape Pty Ltd. All Rights Reserved.");
    expect(textElement).toBeInTheDocument();

    const instagramIcon = getByTestId("instagram-icon");
    const twitterIcon = getByTestId("twitter-icon");
    const facebookIcon = getByTestId("facebook-icon");
    expect(instagramIcon).toBeInTheDocument();
    expect(twitterIcon).toBeInTheDocument();
    expect(facebookIcon).toBeInTheDocument();

    expect(instagramIcon.tagName).toBe("svg");
    expect(twitterIcon.tagName).toBe("svg");
    expect(facebookIcon.tagName).toBe("svg");
  });

  it("does not render the footer when there is an error", () => {
    useStateContext.mockReturnValue({ error: "Some error message" });

    const { container } = render(<Footer />);

    const footerContainer = container.querySelector(".footer-container");
    expect(footerContainer).toBeNull();
  });
});
