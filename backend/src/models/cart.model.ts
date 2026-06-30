import mongoose, { Schema, Document } from "mongoose";

export interface ICart extends Document {
  user: mongoose.Types.ObjectId;

  items: {
    product: mongoose.Types.ObjectId;
    quantity: number;
  }[];
}

const cartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model<ICart>("Cart", cartSchema);

export default Cart;