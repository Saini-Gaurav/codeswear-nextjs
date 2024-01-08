import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleChange = (e) => {
    if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { email, password };

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        // Handle non-successful responses
        const errorResponse = await res.json();
        throw new Error(errorResponse.error || "Failed to sign up");
      }

      const response = await res.json();
      console.log(response);

      // Reset form fields
      setEmail("");
      setPassword("");
      if (response.success) {
        localStorage.setItem('token', response.token)
        toast.success("You are successfully logged in", {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(()=>{
          router.push("http://localhost:3000")
        }, 1000)
      } else {
        toast.error(response.error, {
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
      console.error("Error during form submission:", error.message);
      // Handle the error, for example, show an error message to the user
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
      <form onSubmit={handleSubmit} method="POST">
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
        {/* Password input */}
        <div className="form-outline mb-4">
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
        {/* 2 column grid layout for inline styling */}
        <div className="row mb-4">
          <div className="col d-flex justify-content-center">
            {/* Submit button */}
            <button type="submit" className="btn btn-primary btn-block mx-4">
              Sign in
            </button>
            {/* Checkbox */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue=""
                id="form2Example31"
                defaultChecked=""
              />
              <label className="form-check-label" htmlFor="form2Example31">
                {" "}
                Remember me{" "}
              </label>
            </div>
          </div>
          <div className="col">
            {/* Simple link */}
            <Link href={"/forgot"} legacyBehavior>
              <a href="#!">Forgot password?</a>
            </Link>
          </div>
        </div>
        {/* Register buttons */}
        <div className="text-center">
          <p>
            Not a member?{" "}
            <Link href={"/signup"} legacyBehavior>
              <a href="#!">Register</a>
            </Link>
          </p>
          <p>or sign up with:</p>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-facebook-f" />
          </button>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-google" />
          </button>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-twitter" />
          </button>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-github" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
