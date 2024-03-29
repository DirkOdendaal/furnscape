import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../../../context/AuthContext";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { MdOutlineAddLocation } from "react-icons/md";
import { collection, query } from "firebase/firestore";
import { db } from "../../../../config/firebase";
import { AccountLayout } from "../../../../components";
import Link from "next/link";

const AddressBook = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [addressBook, setAddressBook] = useState(null);
  const { customerId } = router.query;

  useEffect(() => {
    if (!user) {
      router.push("/Login");
    }
  }, [router, user]);

  useEffect(() => {
    const addressRef = collection(db, `users/${customerId}`, "addressBook");
    const q = query(addressRef);
    getDocs(q)
      .then((snapshot) => {
        setAddressBook(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, [customerId]);

  return (
    <AccountLayout>
      <div>
        <div className="address-heading">
          <h3>Address Book</h3>
          <Link href={`/customer/${customerId}/AddressBook/add`}>
            <button className="btn">Add Address</button>
          </Link>
        </div>
        {addressBook?.length >= 1 ? (
          addressBook.map((address) => (
            <div className="address-item" key={address.id}>
              <div className="address">
                <span>{`${address.streetNumber} ${address.streetName}`}</span>
                <span>
                  {`${address.suburb}, ${address.city}, ${address.province}, ${address.postalCode}`}
                </span>
              </div>
              <div className="address-actions">
                <AiOutlineEdit className="action-button" />
                <AiOutlineDelete className="action-button-delete" />
              </div>
            </div>
          ))
        ) : (
          <div className="address-item">
            <div className="address">
              <span>No Addresses. Please add a delivery address.</span>
            </div>
            <div className="address-actions">
              <MdOutlineAddLocation className="action-button" />
            </div>
          </div>
        )}
      </div>
    </AccountLayout>
  );
};

export default AddressBook;
