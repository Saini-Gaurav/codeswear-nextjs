import { useRouter } from "next/router";
import Order from "@/models/Order";
import React, { useEffect } from "react";
import mongoose from "mongoose";

const MyOrder = ({ subTotal, order, clearCart }) => {
  const products = order.products;
  // console.log(order.products);

  const router = useRouter();
  useEffect(() => {
    if (router.query.clearCart == 1) {
      clearCart();
    }
  }, []);

  return (
    <section className="h-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-10 col-xl-8">
            <div className="card" style={{ borderRadius: 10 }}>
              <div className="card-header px-4 py-5">
                <h5 className="text-muted mb-0">
                  Thanks for your Order,{" "}
                  <span style={{ color: "#a8729a" }}>Anna</span>!
                </h5>
              </div>
              {Object.keys(products).map((key) => {
                return (
                  <div key={key} className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <p
                        className="lead fw-normal mb-0"
                        style={{ color: "#a8729a" }}
                      >
                        Receipt
                      </p>
                      <p className="small text-muted mb-0">
                        Receipt Voucher : 1KAU9-84UIL
                      </p>
                    </div>
                    <div className="card shadow-0 border mb-4">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-2">
                            <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/13.webp"
                              className="img-fluid"
                              alt="Phone"
                            />
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0">
                              {products[key].name}
                            </p>
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0 small">
                              {products[key].variant}
                            </p>
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0 small">
                              {products[key].size}
                            </p>
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0 small">
                              {products[key].qty}
                            </p>
                          </div>
                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0 small">
                            {products[key].price} X {products[key].qty} = ₹{products[key].price * products[key].qty}
                            </p>
                          </div>
                        </div>
                        <hr
                          className="mb-4"
                          style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between pt-2">
                      <p className="fw-bold mb-0">Order Details</p>
                      <p className="text-muted mb-0">
                        <span className="fw-bold me-4">Total</span> ₹898.00
                      </p>
                    </div>
                    <div className="d-flex justify-content-between pt-2">
                      <p className="fw-bold mb-0">Order Details</p>
                      <p className="text-muted mb-0">
                        {/* <span className="fw-bold me-4">OrderID</span> {order.orderId} */}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between pt-2">
                      <p className="text-muted mb-0">Invoice Number : 788152</p>
                      <p className="text-muted mb-0">
                        <span className="fw-bold me-4">Discount</span> ₹19.00
                      </p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="text-muted mb-0">
                        Invoice Date : 22 Dec,2019
                      </p>
                      <p className="text-muted mb-0">
                        <span className="fw-bold me-4">GST 18%</span> 123
                      </p>
                    </div>
                    <div className="d-flex justify-content-between mb-5">
                      <p className="text-muted mb-0">
                        Recepits Voucher : 18KU-62IIK
                      </p>
                      <p className="text-muted mb-0">
                        <span className="fw-bold me-4">Delivery Charges</span>{" "}
                        Free
                      </p>
                    </div>
                  </div>
                );
              })}
              <div
                className="card-footer border-0 px-4 py-5"
                style={{
                  backgroundColor: "#a8729a",
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                }}
              >
                <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
                  {/* Total paid: <span className="h2 mb-0 ms-2">{order.amount}</span> */}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let order = await Order.findById(context.query.id);
  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
}

export default MyOrder;
