import React from "react";

const Checkout = ({ subTotal }) => {
  return (
    <div className="container p-4">
      <h2 className="mx-auto mt-2" style={{ width: "200px" }}>
        Checkout
      </h2>
      <h4>Delivery Details</h4>
      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" id="name" />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Password
          </label>
          <input type="email" className="form-control" id="email" />
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <textarea
            type="textarea"
            className="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress2" className="form-label">
            Address 2
          </label>
          <textarea
            type="text"
            className="form-control"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input type="phone" className="form-control" id="phone" />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputCity" className="form-label">
            City
          </label>
          <input type="text" className="form-control" id="inputCity" />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputState" className="form-label">
            State
          </label>
          <select id="inputState" className="form-select">
            <option selected>Choose...</option>
            <option>...</option>
          </select>
        </div>
        <div className="col-md-2">
          <label htmlFor="inputZip" className="form-label">
            Zip
          </label>
          <input type="text" className="form-control" id="inputZip" />
        </div>
      </form>
      <div className="m-4">
        <span>Subtotal: {subTotal}</span>
      </div>
      <button type="button" className="btn btn-primary btn-lg btn-block">
          Pay ₹
        </button>
    </div>
  );
};

export default Checkout;
