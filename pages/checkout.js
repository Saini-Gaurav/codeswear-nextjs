import React, { useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";

const Checkout = ({ cart, clearCart, subTotal }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [pincode, setPincode] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [disable, setDisable] = useState(true);
  const [user, setUser] = useState({ value: null });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("myuser"));
    if (user && user.token) {
      setUser(user);
      setEmail(user.email);
    }
  }, []);

  useEffect(() => {
    if (
      name &&
      email &&
      phone &&
      address &&
      pincode
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [name, email, phone, address, pincode]);

  const handleChange = async (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
      if (e.target.value.length == 6) {
        let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
        let pinJson = await pins.json();
        if (Object.keys(pinJson).includes(e.target.value)) {
          setState(pinJson[e.target.value][1]);
          setCity(pinJson[e.target.value][0]);
        } else {
          setState("");
          setCity("");
        }
      } else {
        setState("");
        setCity("");
      }
    }
    setTimeout(() => {
      if (name && email && phone && address && pincode) {
        setDisable(false);
      } else {
        setDisable(true);
      }
    }, 100);
  };
  const initiatePayment = async () => {
    let oid = Math.floor(Math.random() * Date.now());
    //Get a transaction token
    const data = {
      cart,
      subTotal,
      oid,
      email: email,
      name,
      address,
      pincode,
      phone,
    };
    try {
      let a = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`,
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      let txnRes = await a.json();
      console.log(txnRes);
      // if(txnRes.success){ //-- Pending
      let txnToken = txnRes.txnToken;
    } catch (error) {
      console.error("Error:", error);
    }
    // postJSON(data);

    var config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: oid /* update order id */,
        token: txnToken /* update token value */,
        tokenType: "TXN_TOKEN",
        amount: subTotal /* update amount */,
      },
      handler: {
        notifyMerchant: function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        },
      },
    };
    // initialze configuration using init method
    window.Paytm.CheckoutJS.init(config)
      .then(function onSuccess() {
        // after successfully updating configuration, invoke JS Checkout
        window.Paytm.CheckoutJS.invoke();
      })
      .catch(function onError(error) {
        console.log("error => ", error);
      });
    // }
    // else {
    //   console.log(txnRes.error)
    //   if(txnRes.cartClear){
    //   clearCart();
    // }
    // }
  };
  return (
    <div className="container p-4">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <Script
        type="application/javascript"
        src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}
        crossorigin="anonymous"
      />
      <h2 className="mx-auto mt-2" style={{ width: "200px" }}>
        Checkout
      </h2>
      <h4>Delivery Details</h4>
      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            onChange={handleChange}
            value={name}
            type="text"
            className="form-control"
            id="name"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          {user && user.token ? (
            <input
              value={user.email}
              type="email"
              className="form-control"
              id="email"
              readOnly
            />
          ) : (
            <input
              onChange={handleChange}
              value={email}
              type="email"
              className="form-control"
              id="email"
            />
          )}
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <textarea
            onChange={handleChange}
            value={address}
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
          <input
            onChange={handleChange}
            value={phone}
            type="phone"
            className="form-control"
            id="phone"
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputState" className="form-label">
            State
          </label>
          <input
            onChange={handleChange}
            value={state}
            type="text"
            className="form-control"
            id="inputCity"
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputState" className="form-label">
            Distric
          </label>
          <input
            onChange={handleChange}
            value={city}
            type="text"
            id="inputCity"
            className="form-control"
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="inputZip" className="form-label">
            Zip
          </label>
          <input
            onChange={handleChange}
            value={pincode}
            type="text"
            className="form-control"
            id="inputZip"
          />
        </div>
      </form>
      <div className="m-4">
        <span>Subtotal: {subTotal}</span>
      </div>
      <button
        disabled={disable}
        onClick={initiatePayment}
        type="button"
        className="btn btn-primary btn-lg btn-block"
      >
        Pay ₹
      </button>
    </div>
  );
};

export default Checkout;
