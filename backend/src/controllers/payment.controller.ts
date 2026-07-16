import crypto from 'crypto';
import { getRazorpayInstance } from "../config/razorpay";
import { Request, Response } from 'express';
import Payment from '../models/payment.model';
import Order from '../models/order.model';
import asyncHandler from '../utils/asyncHandler';
import ApiError from '../utils/ApiError';
import ApiResponse from '../utils/ApiResponse';

export const createPayment = asyncHandler(
  async (req: Request, res: Response) => {
    const { orderId, paymentMethod } = req.body;

    if (!orderId || !paymentMethod) {
      throw new ApiError(400, 'Order ID and payment method are required');
    }

    const order = await Order.findById(orderId);

    if (!order) {
      throw new ApiError(404, 'Order not found');
    }

    const existingPayment = await Payment.findOne({
      order: orderId,
    });

    if (existingPayment) {
      throw new ApiError(400, 'Payment already exists for this order');
    }

    const payment = await Payment.create({
      order: order._id,
      user: req.user?._id,

      amount: order.finalAmount,

      paymentMethod,

      paymentGateway: paymentMethod === 'ONLINE' ? 'RAZORPAY' : 'NONE',

      paymentStatus: paymentMethod === 'COD' ? 'Success' : 'Pending',

      paidAt: paymentMethod === 'COD' ? new Date() : undefined,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, payment, 'Payment created successfully'));
  },
);

export const createRazorpayOrder = asyncHandler(
  async (req: Request, res: Response) => {
    const { orderId } = req.body;

    if (!orderId) {
      throw new ApiError(400, 'Order ID is required');
    }

    const order = await Order.findOne({
      _id: orderId,
      user: req.user?._id,
    });

    if (!order) {
      throw new ApiError(404, 'Order not found');
    }
    const razorpay = getRazorpayInstance();

    const razorpayOrder = await razorpay.orders.create({
      amount: order.finalAmount * 100,
      currency: 'INR',
      receipt: order._id.toString(),
    });

    const payment = await Payment.findOne({
      order: order._id,
    });

    if (!payment) {
      throw new ApiError(404, 'Payment not found');
    }

    payment.razorpayOrderId = razorpayOrder.id;

    await payment.save();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          razorpayOrder,
          'Razorpay order created successfully',
        ),
      );
  },
);

export const verifyRazorpayPayment = asyncHandler(
  async (req: Request, res: Response) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      throw new ApiError(400, 'All Razorpay payment details are required');
    }

    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      throw new ApiError(400, 'Invalid payment signature');
    }

    const payment = await Payment.findOne({
      razorpayOrderId: razorpay_order_id,
    });

    if (!payment) {
      throw new ApiError(404, 'Payment not found');
    }

    payment.paymentStatus = 'Success';
    payment.paymentGateway = 'RAZORPAY';
    payment.transactionId = razorpay_payment_id;

    payment.razorpayPaymentId = razorpay_payment_id;
    payment.razorpaySignature = razorpay_signature;

    payment.paidAt = new Date();

    await payment.save();

    await Order.findByIdAndUpdate(payment.order, {
      paymentStatus: 'Paid',
      orderStatus: 'Confirmed',
    });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, 'Payment verified successfully'));
  },
);

export const getMyPayments = asyncHandler(
  async (req: Request, res: Response) => {
    const payments = await Payment.find({
      user: req.user?._id,
    })
      .populate('order')
      .sort({
        createdAt: -1,
      });

    return res
      .status(200)
      .json(new ApiResponse(200, payments, 'Payments fetched successfully'));
  },
);

export const getPaymentById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const payment = await Payment.findOne({
      _id: id,
      user: req.user?._id,
    }).populate('order');

    if (!payment) {
      throw new ApiError(404, 'Payment not found');
    }

    return res
      .status(200)
      .json(new ApiResponse(200, payment, 'Payment fetched successfully'));
  },
);

export const updatePaymentStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const { paymentStatus } = req.body;

    const payment = await Payment.findById(id);

    if (!payment) {
      throw new ApiError(404, 'Payment not found');
    }

    payment.paymentStatus = paymentStatus;

    if (paymentStatus === 'Success') {
      payment.paidAt = new Date();
    }

    await payment.save();

    return res
      .status(200)
      .json(
        new ApiResponse(200, payment, 'Payment status updated successfully'),
      );
  },
);
