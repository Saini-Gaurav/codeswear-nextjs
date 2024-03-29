import React, { useRef, useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";
// import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";

const Navbar = ({ logout, user }) => {
  // const toggleCart = () => {
  //   const cartRef = ref.current;
  //   cartRef.classList.toggle("cart-open");
  // };

  // const ref = useRef();
  const [dropdown, setDropdown] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary position-sticky top-0 z-3">
      <div className="container-fluid">
        <Link href={"/"} legacyBehavior>
          <a className="navbar-brand" href="#">
            <Image
              width={200}
              height={40}
              src="/logo.png"
              alt="Codeswear Logo"
            />
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

      {/* Cart Icon */}
      <div className="cart d-flex nav-link">
        <span
          onMouseOver={() => setDropdown(true)}
          onMouseLeave={() => setDropdown(false)}
        >
          {dropdown && (
            <div
              onMouseOver={() => setDropdown(true)}
              onMouseLeave={() => setDropdown(false)}
              className="position-absolute end-0 bg-danger mr-4 mt-4 p-2 w-40 "
            >
              <ul className="list-unstyled">
                <Link href={"/myaccount"} legacyBehavior>
                  <a className="text-decoration-none">
                    <li className="text-white">My Account</li>
                  </a>
                </Link>
                <Link href={"/orders"} legacyBehavior>
                  <a className="text-decoration-none">
                    <li className="text-white">Orders</li>
                  </a>
                </Link>
                <Link href={""} legacyBehavior>
                  <a className="text-decoration-none">
                    <li onClick={logout} className="text-white">
                      Log Out
                    </li>
                  </a>
                </Link>
              </ul>
            </div>
          )}
          {user.value && <MdAccountCircle className="mx-2" />}
        </span>
        {!user.value && (
          <Link href={"/login"} legacyBehavior>
            <a>
              <button className="m-1 p-1">Login</button>
            </a>
          </Link>
        )}
        <Link href={"/cart"} legacyBehavior>
          <a className="nav-link" aria-current="page">
            <FaCartArrowDown />
          </a>
        </Link>
      </div>

      {/* Sidebar Shopping Cart */}
      {/* <div
        ref={ref}
        className="sideCart position-absolute top-0 end-0 bg-light p-4"
      >
        <h3>Shopping Cart</h3>
        <span
          onClick={toggleCart}
          className="position-absolute top-3 end-1 cursor-pointer"
        >
          <IoIosCloseCircleOutline />
        </span>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Item 1</li>
          <li className="list-group-item">Item 2</li>
          <li className="list-group-item">Item 3</li>
        </ul>
      </div> */}
    </nav>
  );
};

export default Navbar;
