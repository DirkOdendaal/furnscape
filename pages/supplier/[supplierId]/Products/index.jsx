import { collection, query, where, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { AccountLayout } from "../../../../components";
import { useAuth } from "../../../../context/AuthContext";
import { db } from "../../../../config/firebase";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Image from "next/image";

const Products = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [productsList, setProductList] = useState();
  const { supplierId } = router.query;

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
  }, [user]);

  return (
    <AccountLayout>
      <div className="address-heading">
        <h3>Products</h3>
        <Link href={`/supplier/${supplierId}/Products/add`}>
          <button className="btn">Add Product</button>
        </Link>
      </div>
      {productsList?.length >= 1
        ? productsList.map((product, index) => (
            <div key={index} className="address-item">
              <div>
                <Image
                  height={60}
                  width={60}
                  src={product.image}
                  alt={""}
                  className="review-detail-image"
                ></Image>
              </div>
              <div className="address">
                <span>{`Product: ${product.name}`}</span>
                <span>{`Price: R${product.price}`}</span>
                <span>{`Number Sold: ${product.sold}`}</span>
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

export default Products;
