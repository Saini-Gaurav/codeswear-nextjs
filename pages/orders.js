import React, { useEffect } from "react";
import { useRouter } from "next/router";
import mongoose from "mongoose";
import Order from "@/models/Order";

const Orders = () => {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, [router.query]);
  return (
    <div className="m-2 p-2">
      <h2>My Orders</h2>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let orders = await Order.find({});

  return {
    props: { orders: orders },
  };
}

export default Orders;
