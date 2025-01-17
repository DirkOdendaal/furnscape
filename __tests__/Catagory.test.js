import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Category from "../components/Category";

describe("Category", () => {
  const category = {
    name: "Category Name",
    subCategories: ["Subcategory 1", "Subcategory 2"],
  };

  it("renders the category name and subcategories", () => {
    const { getByText, getAllByTestId } = render(
      <Category category={category} />
    );

    const categoryNameElement = getByText("Category Name");
    expect(categoryNameElement).toBeInTheDocument();

    const subcategoryElements = getAllByTestId("cat-inner-list");
    expect(subcategoryElements).toHaveLength(2);
    expect(subcategoryElements[0]).toHaveTextContent("Subcategory 1");
    expect(subcategoryElements[1]).toHaveTextContent("Subcategory 2");
  });
});
