import { collection, query, where, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { AccountLayout } from "../../../../components";
import { useAuth } from "../../../../context/AuthContext";
import { db } from "../../../../config/firebase";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const Products = ({ supplierId }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [productsList, setProductList] = useState();

  useEffect(() => {
    if (!user && user?.role !== "supplier") {
      router.push("/");
    }
  }, [router, user]);

  useEffect(() => {
    if (user) {
      const productRef = collection(db, `products`);
      const productQuery = query(productRef, where("user", "==", user.uid));
      const unsubscribe = onSnapshot(productQuery, (snapshot) => {
        setProductList(
          snapshot.docs.map((product) => ({
            id: product.id,
            ...product.data(),
          }))
        );
      });
      return () => {
        unsubscribe;
      };
    }
  }, []);

  return (
    <AccountLayout>
      <div className="address-heading">
        <h3>Products</h3>
        <Link href={`/supplier/${supplierId}/AddressBook/add`}>
          <button className="btn">Add Product</button>
        </Link>
      </div>
      {productsList?.length >= 1
        ? productsList.map((product) => (
            <div className="address-item">
              <div>
                <img src={product.image} className="review-detail-image"></img>
              </div>
              <div className="address">
                <span>{`Product: ${product.name}`}</span>
                <span>{`Price: R${product.price}`}</span>
                <span>{`Sold: ${product.sold}`}</span>
              </div>
              <div className="address-actions">
                <AiOutlineEdit className="action-button" />
                <AiOutlineDelete className="action-button-delete" />
              </div>
            </div>
          ))
        : null}
    </AccountLayout>
  );
};
export const getServerSideProps = async (context) => {
  const supplierId = context.query.supplierId;
  return {
    props: { supplierId },
  };
};

export default Products;
