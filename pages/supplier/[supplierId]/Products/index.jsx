import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { AccountLayout } from "../../../../components";
import { useAuth } from "../../../../context/AuthContext";
import { db, storage } from "../../../../config/firebase";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Image from "next/image";

const Products = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [productsList, setProductList] = useState();
  const { supplierId } = router.query;

  const handleDelete = async (deleteProd) => {
    const docRef = doc(db, "products", deleteProd._id);
    await deleteDoc(docRef)
      .then(() => {
        //setToast
      })
      .catch(() => {
        //setToast
      });
    deleteProd.images.forEach(async (img) => {
      const imgRef = ref(storage, img);
      await deleteObject(imgRef)
        .then(() => {
          //setToast
        })
        .catch(() => {
          //setToast
        });
    });
  };

  useEffect(() => {
    if (!user && user?.role !== "supplier") {
      router.push("/");
    }
  }, [router, user]);

  useEffect(() => {
    if (user) {
      const productRef = collection(db, `products`);
      const productQuery = query(productRef, where("user", "==", user.uid));
      getDocs(productQuery)
        .then((snapshot) => {
          setProductList(
            snapshot.docs.map((product) => ({
              _id: product.id,
              ...product.data(),
            }))
          );
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
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
              <div className="address-allignment">
                <Image
                  height={60}
                  width={60}
                  src={product.images[0]}
                  alt={""}
                  className="review-detail-image"
                ></Image>
                <div className="address">
                  <span>
                    <b>Product Name: </b>
                    {product.name}
                  </span>
                  <span>
                    <b>Price: </b>
                    {`R${product.price}`}
                  </span>
                  <span>
                    <b>Number Sold: </b>
                    {product.sold}
                  </span>
                </div>
              </div>

              <div className="address-actions">
                <AiOutlineEdit className="action-button" />
                <AiOutlineDelete
                  className="action-button-delete"
                  onClick={() => handleDelete(product)}
                />
              </div>
            </div>
          ))
        : null}
    </AccountLayout>
  );
};

export default Products;
