import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerClerkId: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      color: { type: String, required: false },
      size: { type: String, required: false },
      price: { type: Number, required: true }, // Add price here
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
