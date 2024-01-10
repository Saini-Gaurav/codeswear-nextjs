import { React, useState } from "react";
import { useRouter } from "next/router";
import mongoose from "mongoose";
import Product from "@/models/Product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Post = ({ buyNow, addToCart, product, variants }) => {
  const router = useRouter();
  const { slug } = router.query;

  const [pin, setPin] = useState();
  const [service, setService] = useState();

  const checkServiceability = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pins.json();
    if (pinJson.includes(parseInt(pin))) {
      setService(true);
      toast.success("Your Pincode is servicable", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setService(false);
      toast.error('Sorry, Pincode not serviceable', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    console.log(service);
  };

  const onChangePin = (e) => {
    setPin(e.target.value);
  };

  // const [color, setColor] = useState(product.color);
  // const [size, setSize] = useState(product.size);
  return (
    <>
      <div className="container py-4">
        <ToastContainer
          position="bottom-center"
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
                    {/* <div className="card-text">
                      {products[item].color.includes("red") && Object.keys(variants['red']).includes(size) &&
                        (<button className="btn btn-danger rounded-circle p-2"></button>)
                      }
                      {products[item].color.includes("green") && Object.keys(variants['green']).includes(size) &&
                        (<button className="btn btn-success rounded-circle p-2"></button>)
                      }
                      {products[item].color.includes("yellow") && Object.keys(variants['yellow']).includes(size) &&
                        (<button className="btn btn-warning rounded-circle p-2"></button>)
                      }
                      {products[item].color.includes("blue") && Object.keys(variants['blue']).includes(size) &&
                        (<button className="btn btn-primary rounded-circle p-2"></button>)
                      }
                      {products[item].color.includes("black") && Object.keys(variants['black']).includes(size) &&
                        (<button className="btn btn-dark rounded-circle p-2"></button>)
                      }
                    </div> */}
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => {
                            buyNow(slug, 1, 499, product.title, size, color);
                          }}
                        >
                          Buy Now
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => {
                            addToCart(slug, 1, 499, product.title, size, color);
                          }}
                        >
                          Add to Cart
                        </button>
                      </div>
                      <small className="text-muted">₹19.99</small>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col">
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
              </div> */}
            </div>
          </div>
          {/* <div className="col-md-4">
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
            </div> */}
        </div>
        <div className="mt-4">
          <input
            onChange={onChangePin}
            placeholder="Enter your pincode"
            type="text"
          />
          <button className="mx-2 px-4" onClick={checkServiceability}>
            Check
          </button>
        </div>
        {!service && service != null && (
          <div>Sorry! We do not deliver to this pincode yet</div>
        )}
        {service && service != null && (
          <div>Yay! We deliver to this pincode</div>
        )}
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let product = await Product.findOne({ slug: context.query.slug });
  let variants = await Product.find({ tittle: Product.title, category: Product.category});
  let colourSizeSlug = {};

  for (let item of variants) {
    if (Object.keys(colourSizeSlug).includes(item.color)) {
      colourSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colourSizeSlug[item.color] = {};
      colourSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colourSizeSlug)),
    },
  };
}

export default Post;
