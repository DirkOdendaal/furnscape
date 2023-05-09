import React from "react";
import { render } from "@testing-library/react";
import { useStateContext } from "../context/StateContext";
import "@testing-library/jest-dom";

import Footer from "../components/Footer";

// Mock the useStateContext custom hook
jest.mock("../context/StateContext", () => ({
  useStateContext: jest.fn(),
}));

describe("Footer", () => {
  it("renders the footer with icons when there is no error", () => {
    // Mock the error value returned by useStateContext
    useStateContext.mockReturnValue({ error: null });

    const { getByText, getByTestId } = render(<Footer />);

    // Assert text is rendered
    const textElement = getByText("Furnscape Pty Ltd. All Rights Reserved.");
    expect(textElement).toBeInTheDocument();

    // Assert icons are rendered
    const instagramIcon = getByTestId("instagram-icon");
    const twitterIcon = getByTestId("twitter-icon");
    const facebookIcon = getByTestId("facebook-icon");
    expect(instagramIcon).toBeInTheDocument();
    expect(twitterIcon).toBeInTheDocument();
    expect(facebookIcon).toBeInTheDocument();

    // Assert correct icon components are used
    expect(instagramIcon.tagName).toBe("svg");
    expect(twitterIcon.tagName).toBe("svg");
    expect(facebookIcon.tagName).toBe("svg");
  });

  it("does not render the footer when there is an error", () => {
    // Mock the error value returned by useStateContext
    useStateContext.mockReturnValue({ error: "Some error message" });

    const { container } = render(<Footer />);

    // Assert footer container is not rendered
    const footerContainer = container.querySelector(".footer-container");
    expect(footerContainer).toBeNull();
  });
});
