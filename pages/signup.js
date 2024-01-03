import React from "react";
import Link from "next/link";

const Signup = () => {
  return (
    <div style={{ width: "40%" }} className="mx-auto">
      <form>
        {/* Email input */}
        <div className="form-outline mb-4 mt-4">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input type="text" id="name" className="form-control" />
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form2Example1">
            Email address
          </label>
          <input type="email" id="form2Example1" className="form-control" />
        </div>
        {/* Password input */}
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form2Example2">
            Password
          </label>
          <input type="password" id="form2Example2" className="form-control" />
        </div>
        {/* 2 column grid layout for inline styling */}
        <div className="row mb-4">
          <div className="col d-flex justify-content-center">
            {/* Submit button */}
            <button type="button" className="btn btn-primary btn-block mx-4">
              Sign in
            </button>
            {/* Checkbox */}
          </div>
          <div className="col">
            {/* Simple link */}
            <Link href={"/forget"} legacyBehavior>
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

export default Signup;
