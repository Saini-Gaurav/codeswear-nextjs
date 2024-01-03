const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [
    {
      productId: { type: String },
      quantity: { type: Number, default: 1 },
    },
  ],
  address: {type: String, required: true},
  amout: {type: Number, required: true},
  status: {type: string, default: 'Pending', required: true},
}, {timestamp: true});

export default mongoose.model("Order", OrderSchema)