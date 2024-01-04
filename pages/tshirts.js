import Link from "next/link";
import React from "react";
import Product from "@/models/Product";
import mongoose from "mongoose";

const Tshirts = ({ products }) => {
  return (
    <div>
      <div className="row">
        {products.map((item) => {
          return (
            <div key={item._id} className="col-sm-3 pt-4 pb-4">
              <Link
                passHref={true}
                href={`/product/${item.slug}`}
                className="text-decoration-none"
              >
                <div className="card" >
                  <img
                  style={{height: "40vh", objectFit: "cover"}}
                    src={item.img}
                    alt="Tshirts"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Tshirts</h5>
                    <p className="card-text">{item.title}</p>
                    <p className="card-text">{item.price}</p>
                    <p className="card-text">S, M, L, XL, XXL</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({category: 'tshirt'});
  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}

export default Tshirts;
