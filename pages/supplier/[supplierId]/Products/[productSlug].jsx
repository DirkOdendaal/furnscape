import React, { useState, useEffect } from "react";
import { AccountLayout } from "../../../../components";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  updateDoc,
  arrayUnion,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { db, storage } from "../../../../config/firebase";
import { useRouter } from "next/router";
import Select from "react-select";
import UploadAndDisplayImage from "../../../../components/UploadAndDisplayImage";
import { useAuth } from "../../../../context/AuthContext";
import { toast } from "react-hot-toast";

const EditProduct = () => {
  const { user } = useAuth();
  const [catagoriesCollection, setCategoriesCollection] = useState();
  const [categories, setCategories] = useState();
  const [subCategories, setSubCategories] = useState();
  const [selectedCat, setSelectedCat] = useState();
  const [selectedSubCat, setSelectedSubCat] = useState();
  const [images, setImages] = useState([]);
  const [desc, setDesc] = useState();
  const [price, setPrice] = useState(0);
  const [name, setName] = useState();
  const router = useRouter();

  const handleUpload = async () => {
    const productsRef = collection(db, "products/");
    if (
      name == null ||
      desc == null ||
      price == 0 ||
      selectedCat == null ||
      selectedSubCat == null
    ) {
      toast.error("Fill in all fields!", {
        style: { backgroundColor: "#012e55", color: "#2cdd82" },
        duration: 2000,
      });
    } else {
      const catagory = { cat: selectedCat.value, subCat: selectedSubCat.value };
      const newProduct = {
        name,
        description: desc,
        price,
        catagory,
        user: user.uid,
        sold: 0,
        companyName: user.displayName,
        dateTime: new Date().toLocaleString(),
      };
      const docRef = await addDoc(productsRef, newProduct);

      await Promise.all(
        images.map((image) => {
          const imgRef = ref(storage, `products/${docRef.id}/${image.path}`);
          uploadBytes(imgRef, image, "data-url").then(async () => {
            const downloadUrl = await getDownloadURL(imgRef);
            await updateDoc(doc(db, "products/", docRef.id), {
              images: arrayUnion(downloadUrl),
            });
          });
        })
      );

      setImages([]);
      setPrice(0);
      setName(null);
      setDesc(null);
      setSelectedCat(null);
      setSelectedSubCat(null);
    }
  };

  const style = {
    control: (styles) => ({
      ...styles,
      border: 0,
      boxShadow: "none",
    }),
    option: (styles, { isFocused }) => ({
      ...styles,
      backgroundColor: isFocused ? "#012e55" : "white",
      color: isFocused ? "#2cdd82" : "012e55",
    }),
    valueContainer: (styles) => ({
      ...styles,
      padding: 0,
    }),
    singleValue: (styles) => ({
      ...styles,
      color: "#012e55",
    }),
    clearIndicator: (styles) => ({
      ...styles,
      color: "red",
    }),
    dropdownIndicator: (styles) => ({
      ...styles,
      color: "#2cdd82",
    }),
  };

  useEffect(() => {
    const collectionRef = collection(db, "catagories");
    const q = query(collectionRef);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCategoriesCollection(
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

  useEffect(() => {
    if (catagoriesCollection)
      setCategories(
        catagoriesCollection.map((category) => ({
          value: category.name,
          label: category.name,
        }))
      );
  }, [catagoriesCollection]);

  useEffect(() => {
    if (selectedCat) {
      const subCats = catagoriesCollection.filter((cat) => {
        return cat.name == selectedCat.value;
      });
      setSubCategories(
        subCats[0].subCategories?.map((cat) => ({
          value: cat,
          label: cat,
        }))
      );
    }
  }, [selectedCat, catagoriesCollection]);

  return (
    <AccountLayout>
      <div>
        <h3>Edit/Add Product</h3>
        <div className="address-content">
          <div className="form__group field">
            <input
              type="input"
              value={name ? name : ""}
              className="form__field"
              placeholder="Product Name"
              name="name"
              id="name"
              required
              onChange={(e) => setName(e.target.value)}
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
              value={desc ? desc : ""}
              onChange={(e) => setDesc(e.target.value)}
              required
            />
            <label htmlFor="desc" className="form__label">
              Description
            </label>
          </div>
          <div className="form__group field">
            <input
              type="number"
              className="form__field"
              placeholder="Price (R)"
              value={price ? price : ""}
              onChange={(e) => setPrice(Number(e.target.value))}
              name="price"
              id="price"
              required
            />
            <label htmlFor="price" className="form__label">
              Price (R)
            </label>
          </div>
          <div className="form__group field">
            <Select
              className="form__field"
              styles={style}
              name="category"
              id="category"
              value={selectedCat ? selectedCat : ""}
              options={categories}
              isClearable={true}
              onChange={(value) => setSelectedCat(value)}
            />
            <label htmlFor="category" className="form__label">
              Category
            </label>
          </div>
          {selectedCat && subCategories?.length >= 1 && (
            <div className="form__group field">
              <Select
                styles={style}
                className="form__field"
                value={selectedSubCat ? selectedSubCat : null}
                options={subCategories}
                isClearable={true}
                onChange={(value) => setSelectedSubCat(value)}
              />
              <label htmlFor="subCat" className="form__label">
                Sub Category
              </label>
            </div>
          )}
          <UploadAndDisplayImage setImages={setImages} images={images} />
          <div className="add-address">
            <button type="btn" className="btn" onClick={() => handleUpload()}>
              Add Product
            </button>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};

export default EditProduct;
