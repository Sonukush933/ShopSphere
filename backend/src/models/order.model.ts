import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;

  items: {
    product: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
  }[];

  shippingAddress: mongoose.Types.ObjectId;

  totalAmount: number;

  coupon?: mongoose.Types.ObjectId;

  discountAmount: number;

  finalAmount: number;

  orderStatus: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';

  paymentStatus: 'Pending' | 'Paid' | 'Failed';

  paymentMethod: string;
}

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],

    shippingAddress: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    coupon: {
      type: Schema.Types.ObjectId,
      ref: 'Coupon',
      default: null,
    },
    discountAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    finalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    orderStatus: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },

    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed'],
      default: 'Pending',
    },

    paymentMethod: {
      type: String,
      default: 'COD',
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;
