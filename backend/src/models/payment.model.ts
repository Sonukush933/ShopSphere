import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
  order: mongoose.Types.ObjectId;

  user: mongoose.Types.ObjectId;

  amount: number;

  paymentMethod: 'COD' | 'ONLINE';

  paymentGateway: 'RAZORPAY' | 'NONE';

  paymentStatus: 'Pending' | 'Success' | 'Failed';

  transactionId?: string;

  razorpayOrderId?: string;

  razorpayPaymentId?: string;

  razorpaySignature?: string;

  paidAt?: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentMethod: {
      type: String,
      enum: ['COD', 'ONLINE'],
      required: true,
    },

    paymentGateway: {
      type: String,
      enum: ['NONE', 'RAZORPAY'],
      default: 'NONE',
    },

    paymentStatus: {
      type: String,
      enum: ['Pending', 'Success', 'Failed'],
      default: 'Pending',
    },

    transactionId: {
      type: String,
    },

    razorpayOrderId: {
      type: String,
    },

    razorpayPaymentId: {
      type: String,
    },

    razorpaySignature: {
      type: String,
    },

    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const Payment = mongoose.model<IPayment>('Payment', paymentSchema);

export default Payment;
