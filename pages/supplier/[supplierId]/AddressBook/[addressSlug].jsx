import React, { useRef } from "react";
import { AccountLayout, AddressSearch } from "../../../../components";
import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];

const EditAddress = ({ addressSlug }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY,
    libraries,
  });

  const nameRef = useRef();
  const numberRef = useRef();
  const streetRef = useRef();
  const provinceRef = useRef();
  const cityRef = useRef();
  const postalRef = useRef();
  const suburbRef = useRef();

  const addAddress = () => {
    // console.log(streetRef.current.value);
  };

  return (
    <AccountLayout>
      <div>
        <h3>Edit/Add Address</h3>
        <div className="address-content">
          <div className="form__group field">
            <input
              type="input"
              className="form__field"
              placeholder="Title"
              name="name"
              id="name"
              required
              ref={nameRef}
            />
            <label htmlFor="name" className="form__label">
              Recipient Name
            </label>
          </div>
          <div className="form__group field">
            <input
              type="input"
              className="form__field"
              placeholder="Title"
              name="number"
              id="number"
              required
              ref={numberRef}
            />
            <label htmlFor="number" className="form__label">
              Recipient Mobile Number
            </label>
          </div>
          {isLoaded ? (
            <AddressSearch streetRef={streetRef} />
          ) : (
            <div>Loading...</div>
          )}
          <div className="form__group field">
            <input
              type="input"
              className="form__field"
              placeholder="Title"
              name="province"
              id="province"
              required
              ref={provinceRef}
            />
            <label htmlFor="province" className="form__label">
              Province
            </label>
          </div>
          <div className="form__group field">
            <input
              type="input"
              className="form__field"
              placeholder="Title"
              name="city"
              id="city"
              required
              ref={cityRef}
            />
            <label htmlFor="city" className="form__label">
              City
            </label>
          </div>
          <div className="form__group field">
            <input
              type="input"
              className="form__field"
              placeholder="Title"
              name="suburb"
              id="suburb"
              required
              ref={suburbRef}
            />
            <label htmlFor="suburb" className="form__label">
              Suburb
            </label>
          </div>
          <div className="form__group field">
            <input
              type="input"
              className="form__field"
              placeholder="Title"
              name="postal"
              id="postal"
              required
              ref={postalRef}
            />
            <label htmlFor="postal" className="form__label">
              Postal Code
            </label>
          </div>
          <div className="add-address">
            <button type="btn" className="btn" onClick={() => addAddress()}>
              Add Address
            </button>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};

export const getServerSideProps = async ({ params: { addressSlug } }) => {
  return {
    props: { addressSlug },
  };
};

export default EditAddress;
