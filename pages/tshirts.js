import Link from "next/link";
import React from "react";
import Product from "@/models/Product";
import mongoose from "mongoose";

const Tshirts = ({ products }) => {
  return (
    <div>
      <div className="row">
        {Object.keys(products).map((item) => {
          return (
            <div key={item._id} className="col-sm-3 pt-4 pb-4">
              <Link
                passHref={true}
                href={`/product/${item.slug}`}
                className="text-decoration-none"
              >
                <div className="card">
                  <img
                    style={{ height: "40vh", objectFit: "cover" }}
                    src={products[item].img}
                    alt="Tshirts"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Tshirts</h5>
                    <p className="card-text">{products[item].title}</p>
                    <p className="card-text">₹ {products[item].price}</p>
                    <div className="card-text">
                      {products[item].size.includes("S") && (
                        <span className="border m-1 p-1">S</span>
                      )}
                      {products[item].size.includes("M") && (
                        <span className="border m-1 p-1">M</span>
                      )}
                      {products[item].size.includes("L") && (
                        <span className="border m-1 p-1">L</span>
                      )}
                      {products[item].size.includes("XL") && (
                        <span className="border m-1 p-1">XL</span>
                      )}
                      {products[item].size.includes("XXL") && (
                        <span className="border m-1 p-1">XXL</span>
                      )}
                    </div>
                    <div className="card-text">
                      {products[item].color.includes("red") &&
                        (<button className="btn btn-danger rounded-circle p-2"></button>)
                      }
                      {products[item].color.includes("green") &&
                        (<button className="btn btn-success rounded-circle p-2"></button>)
                      }
                      {products[item].color.includes("yellow")  &&
                        (<button className="btn btn-warning rounded-circle p-2"></button>)
                      }
                      {products[item].color.includes("blue")  &&
                        (<button className="btn btn-primary rounded-circle p-2"></button>)
                      }
                      {products[item].color.includes("black")  &&
                        (<button className="btn btn-dark rounded-circle p-2"></button>)
                      }
                    </div>
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
  let products = await Product.find({ category: "tshirt" });
  let tshirts = {};
  for (let item of products) {
    if (item.title in tshirts) {
      if (
        !tshirts[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].color.push(item.color);
      }
      if (
        !tshirts[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].size.push(item.size);
      }
    } else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        tshirts[item.title].color = [item.color];
        tshirts[item.title].size = [item.size];
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(tshirts)) },
  };
}

export default Tshirts;
