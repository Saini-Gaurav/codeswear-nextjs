import { React, useState } from "react";
import { useRouter } from "next/router";

const Post = ({addToCart}) => {
  const router = useRouter();
  const { slug } = router.query;

  const [pin, setPin] = useState();
  const [service, setService] = useState();

  const checkServiceability = async () => {
    let pins = await fetch("http://localhost:3000/api/pincode");
    let pinJson = await pins.json();
    if (pinJson.includes(parseInt(pin))) {
      setService(true);
    } else {
      setService(false);
    }
    console.log(service)
  };

  const onChangePin = (e) => {
    setPin(e.target.value);
  };
  return (
    <>
      <div className="container py-4">
        <div className="row">
          <div className="col-md-8">
            <h2 className="mb-4">Our Products</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <div className="col">
                <div className="card h-100">
                  <img
                    src="https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/81GFLtGfAnL._SX569_.jpg"
                    className="card-img-top"
                    alt="Product Image"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Product Name</h5>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={()=>{addToCart(slug, 1, 499, 'Wear the code(X,XL, red)', 'X,XL',
                          'Red')}}
                        >
                          Add to Cart
                        </button>
                      </div>
                      <small className="text-muted">₹19.99</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100">
                  <img
                    src="https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/81GFLtGfAnL._SX569_.jpg"
                    className="card-img-top"
                    alt="Product Image"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Product Name</h5>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={()=>{addToCart(slug, 1, 499, 'Wear the code(X,XL, red)', 'X,XL',
                          'Red')}}
                        >
                          Add to Cart
                        </button>
                      </div>
                      <small className="text-muted">₹19.99</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100">
                  <img
                    src="https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/81GFLtGfAnL._SX569_.jpg"
                    className="card-img-top"
                    alt="Product Image"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Product Name</h5>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={()=>{addToCart(slug, 1, 499, 'Wear the code(X,XL, red)', 'X,XL',
                          'Red')}}
                        >
                          Add to Cart
                        </button>
                      </div>
                      <small className="text-muted">₹19.99</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">Cart Summary</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Product Name 1
                  <span className="badge bg-primary float-end">₹19.99</span>
                </li>
                <li className="list-group-item">
                  Product Name 2
                  <span className="badge bg-primary float-end">₹39.99</span>
                </li>
                <li className="list-group-item">
                  <strong>Total</strong>
                  <span className="badge bg-success float-end">₹59.98</span>
                </li>
              </ul>
              <div className="card-body">
                <a href="#" className="btn btn-primary">
                  Checkout
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <input onChange={onChangePin} placeholder = "Enter your pincode" type="text" />
          <button className="mx-2 px-4" onClick={checkServiceability}>
            Check
          </button>
        </div>
        {(!service && service != null) && 
          <div>Sorry! We do not deliver to this pincode yet</div>
        }
        {(service && service != null) && 
          <div>Yay! We deliver to this pincode</div>
        }
      </div>
    </>
  );
};

export default Post;
