import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";

const Forgot = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  const handleChange = async (e) => {
    if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "cpassword") {
      setCpassword(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    }
  };

  const sendResetEmail = async () => {
    let data = {
      email,
      sendMail: true,
    };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let res = await a.json();
    if (res.success) {
      console.log("Email has been sent to your email ");
    } else {
      console.log("Error");
    }
  };

  const resetPassword = async () => {
    if (password === cpassword) { // Use strict equality (===) instead of == for comparison
      try {
        const data = {
          password,
          sendMail: false,
        };
  
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        const result = await response.json();
        
        if (result.ok) {
          console.log("Password has been changed");
        } else {
          console.log("Error:", result.message); // Log error message if not successful
        }
      } catch (error) {
        console.error("Error:", error); // Log any network or parsing errors
      }
    } else {
      console.log("Passwords don't match"); // Notify if passwords don't match
    }
  };

  return (
    <div style={{ width: "40%" }} className="mx-auto">
      {router.query.token && (
        <form>
          {/* Email input */}
          <div className="form-outline mb-4 mt-4">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              value={password}
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              className="form-control"
            />
          </div>
          <div className="form-outline mb-4 mt-4">
            <label className="form-label" htmlFor="cpassword">
              Confirm Password
            </label>
            <input
              value={cpassword}
              onChange={handleChange}
              type="password"
              id="cpassword"
              name="cpassword"
              className="form-control"
            />
          </div>
          {/* 2 column grid layout for inline styling */}
          <div className="row mb-4">
            <div className="col d-flex justify-content-center">
              {/* Submit button */}
              <button
                onClick={resetPassword}
                type="button"
                className="btn btn-primary btn-block mx-4"
              >
                Continue
              </button>
            </div>
          </div>
          {password != cpassword && 
          <span className="text-danger pb-4">Password don't match</span>}
          {password && password === cpassword && 
          <span className="text-success pb-4">Password match</span>}
        </form>
      )}
      {!router.query.token && (
        <form>
          {/* Email input */}
          <div className="form-outline mb-4 mt-4">
            <label className="form-label" htmlFor="email">
              Email address
            </label>
            <input
              value={email}
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              className="form-control"
            />
          </div>
          {/* 2 column grid layout for inline styling */}
          <div className="row mb-4">
            <div className="col d-flex justify-content-center">
              {/* Submit button */}
              <button
                onClick={sendResetEmail}
                type="button"
                className="btn btn-primary btn-block mx-4"
              >
                Continue
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Forgot;
