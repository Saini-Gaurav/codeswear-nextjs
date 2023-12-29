import React, { useRef } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { IoIosCloseCircleOutline } from "react-icons/io";


const Navbar = () => {
  const toggleCart = ()=>{

  }  

  const ref = useRef();
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link href={"/"} legacyBehavior>
        <a className="navbar-brand" href="#">
          <Image width={200} height={40} src="/logo.png" alt="Codeswear Logo" />
        </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <Link href={"/tshirts"} legacyBehavior>
                <a
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Tshirts
                </a>
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item">Action</a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link href={"/hoodies"} legacyBehavior>
                <a className="nav-link" aria-current="page">
                  Hoodies
                </a>
              </Link>
            </li>
            <li className="nav-item" aria-current="page"> 
              <Link href={"/stickers"} legacyBehavior>
                <a className="nav-link">Stickers</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href={"/mugs"} legacyBehavior>
                <a className="nav-link" aria-current="page">
                  Mugs
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="cart absolute top-2 mx-sm-3 mx-md-4 mx-lg-5 mx-xl-5">
        <Link href={"/"} className="text-decoration-none">
          <FaCartArrowDown />
        </Link>
      </div>
      <div ref={ref} className="sideCart position-absolute top-0 end-0 bg-pink-100 p-10 transform translate-x-full transition-transform">
        <h3>Shooping Cart</h3>
        <span onClick={toggleCart} className="position-absolute top-3 end-1 cursor-pointer"><IoIosCloseCircleOutline /></span>
      </div>
    </nav>
  );
};

export default Navbar;
