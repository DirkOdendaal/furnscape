import React from "react";
import { AccountLayout } from "../../../../components";

const EditProduct = ({ productSlug }) => {
  return (
    <AccountLayout>
      <div>
        <h3>Edit/Add Product</h3>
      </div>
    </AccountLayout>
  );
};

export const getServerSideProps = async ({ params: { productSlug } }) => {
  return {
    props: { productSlug },
  };
};

export default EditProduct;
