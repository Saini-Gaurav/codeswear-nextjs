import { useEffect } from "react";
import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";


const Forgot = () => {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);
  return (
    <div style={{ width: "40%" }} className="mx-auto">
      <form>
        {/* Email input */}
        <div className="form-outline mb-4 mt-4">
          <label className="form-label" htmlFor="form2Example1">
            Email address
          </label>
          <input type="email" id="form2Example1" className="form-control" />
        </div>
        {/* 2 column grid layout for inline styling */}
        <div className="row mb-4">
          <div className="col d-flex justify-content-center">
            {/* Submit button */}
            <button type="button" className="btn btn-primary btn-block mx-4">
              Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Forgot;
