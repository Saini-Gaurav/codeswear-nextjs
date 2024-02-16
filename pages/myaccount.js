import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyAccount = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [pincode, setPincode] = useState();
  const [user, setUser] = useState({ value: null });
  const [password, setPassword] = useState();
  const [cpassword, setCpassword] = useState();
  const [npassword, setNpassword] = useState();

  const router = useRouter();
  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (!myuser) {
      router.push("/");
    }
    if (myuser && myuser.token) {
      setUser(myuser);
      setEmail(myuser.email);
      fetchData(myuser.token);
    }
  }, []);

  const fetchData = async (token) => {
    let data = { token: token };
    try {
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let res = await a.json();
      console.log(res);
      setName(res.name);
      setAddress(res.address);
      setPincode(res.pincode);
      setPhone(res.phone);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUserSubmit = async () => {
    let data = { token: user.token, address, name, pincode, phone };
    try {
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let res = await a.json();
      // console.log(res);
      if(res.success){
      toast.success("Successfully Updated Details", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }); 
    } 
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePasswordSubmit = async () => {
    let res;
    if(npassword == cpassword){}
    let data = { token: user.token, password, cpassword, npassword };
    try {
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      res = await a.json();
      console.log(data);
      if(res.success){
      toast.success("Successfully Updated Password", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else {
      toast.error("Error updating password", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    }
    setPassword('');
    setCpassword('');
    setNpassword('');
    } 
   catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = async (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "phone") {
      setPhone(e.target.value);
    } else if (e.target.name === "address") {
      setAddress(e.target.value);
    } else if (e.target.name === "pincode") {
      setPincode(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "cpassword") {
      setCpassword(e.target.value);
    } else if (e.target.name === "npassword") {
      setNpassword(e.target.value);
    }
  };
  return (
    <div style={{ width: "40%" }} className="mx-auto">
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container mx-auto my-4"></div>
      <h2 className="text-center">Update your account</h2>
      <h4>1. Delivery Details</h4>
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
            name="name"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email (cannot be updated)
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
            name="address"
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
            name="phone"
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="pincode" className="form-label">
            Zip
          </label>
          <input
            onChange={handleChange}
            value={pincode}
            type="text"
            className="form-control"
            id="pincode"
            name="pincode"
          />
        </div>
      </form>
      <button
        onClick={handleUserSubmit}
        type="button"
        className="btn btn-primary mt-4 mb-4"
      >
        Submit
      </button>
      <h4>2. Change Password</h4>
      <form className="row g-3">
        <div className="col-md-4">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={handleChange}
            value={password}
            type="password"
            className="form-control"
            id="password"
            name="password"
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            onChange={handleChange}
            value={cpassword}
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="npassword" className="form-label">
            New Password
          </label>
          <input
            onChange={handleChange}
            value={npassword}
            type="password"
            className="form-control"
            id="npassword"
            name="npassword"
          />
        </div>
      </form>
      <button onClick={handlePasswordSubmit} type="button" className="btn btn-primary mt-4 mb-4">
        Submit
      </button>
    </div>
  );
};

export default MyAccount;
