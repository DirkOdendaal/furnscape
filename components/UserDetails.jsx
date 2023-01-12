import React, { useState, useEffect } from "react";

const UserDetails = ({ user }) => {
  const [headings, setHeadings] = useState({});

  useEffect(() => {
    if (user.role === "customer") {
      setHeadings({ bigHeader: "Customer Details", nameHeader: "Name" });
    } else if (user.role === "supplier") {
      setHeadings({ bigHeader: "Company Details", nameHeader: "Company Name" });
    }
  }, [user]);

  return (
    <div>
      <div className="address-heading">
        <h3>{headings.bigHeader}</h3>
        <button className="btn">Edit Details</button>
      </div>
      <div className="address-content">
        <div className="form__group field">
          <input
            type="text"
            className="form__field"
            placeholder="Title"
            name="name"
            id="name"
            required
          />
          <label htmlFor="name" className="form__label">
            {headings.nameHeader}
          </label>
        </div>
        <div className="form__group field">
          <input
            type="email"
            className="form__field"
            placeholder="Title"
            name="email"
            id="email"
            required
          />
          <label htmlFor="email" className="form__label">
            Email
          </label>
        </div>
        <div className="form__group field">
          <input
            type="email"
            className="form__field"
            placeholder="Title"
            name="cellNumber"
            id="cellNumber"
            required
          />
          <label htmlFor="cellNumber" className="form__label">
            Cell Number
          </label>
        </div>
        <div className="add-address">
          <button type="btn" className="btn">
            Save Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
