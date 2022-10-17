import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../../../context/AuthContext";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { MdOutlineAddLocation } from "react-icons/md";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../../config/firebase";
import { AccountLayout } from "../../../../components";

const AddressBook = ({ customerId }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [addressBook, setAddressBook] = useState(null);

  useEffect(() => {
    if (!user) {
      router.push("/Login");
    }
  }, [router, user]);

  useEffect(() => {
    const addressRef = collection(db, `users/${customerId}`, "addressBook");
    const q = query(addressRef);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAddressBook(
        snapshot.docs.map((address) => ({
          id: address.id,
          ...address.data(),
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
          <div className="address-heading">
            <h3>Address Book</h3>
            <button className="btn">Add Address</button>
          </div>
          {addressBook?.length > 1 ? (
            addressBook.map((address) => (
              <div className="address-item" key={address.id}>
                <div className="address">
                  <span>{`${address.guid.streetNumber} ${address.guid.streetName}`}</span>
                  <span>
                    {`${address.guid.suburb}, ${address.guid.city}, ${address.guid.province}, ${address.guid.postalCode}`}
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

export const getServerSideProps = async (context) => {
  //currentUserId
  const customerId = context.query.customerId;
  return {
    props: { customerId },
  };
};

export default AddressBook;
