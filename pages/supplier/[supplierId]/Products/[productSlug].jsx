import React, { useState, useEffect } from "react";
import { AccountLayout } from "../../../../components";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../../../config/firebase";
import { useRouter } from "next/router";

const EditProduct = () => {
  const [categories, setCategories] = useState();
  const [selectedCat, setCat] = useState();
  const router = useRouter();
  const { productSlug } = router.query;

  useEffect(() => {
    const collectionRef = collection(db, "catagories");
    const q = query(collectionRef);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCategories(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => {
      unsubscribe;
    };
  }, []);

  return (
    <AccountLayout>
      <div>
        <h3>Edit/Add Product</h3>
        <div className="address-content">
          <div className="form__group field">
            <input
              type="input"
              className="form__field"
              placeholder="Product Name"
              name="name"
              id="name"
              required
            />
            <label htmlFor="name" className="form__label">
              Product Name
            </label>
          </div>
          <div className="form__group field">
            <textarea
              type="input"
              className="form__field"
              placeholder="Description"
              name="desc"
              id="desc"
              cols={40}
              rows={5}
              maxLength={3000}
              required
            />
            <label htmlFor="desc" className="form__label">
              Description
            </label>
          </div>
          <div className="form__group field">
            <input
              type="input"
              className="form__field"
              placeholder="Price (R)"
              name="price"
              id="price"
              required
            />
            <label htmlFor="price" className="form__label">
              Price (R)
            </label>
          </div>
          <div className="form__group field">
            <select
              onChange={() => setCat(this.selectedIndex)}
              className="form__field"
              name="category"
              id="category"
              required
            >
              <option value={-1} style={{ display: "none" }}></option>
              {categories?.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <label htmlFor="category" className="form__label">
              Category
            </label>
          </div>
          {selectedCat && (
            <div className="form__group field">
              <select
                className="form__field"
                name="subCat"
                id="subCat"
                required
              ></select>
              <label htmlFor="subCat" className="form__label">
                Sub Category
              </label>
            </div>
          )}
        </div>
      </div>
    </AccountLayout>
  );
};

export default EditProduct;
