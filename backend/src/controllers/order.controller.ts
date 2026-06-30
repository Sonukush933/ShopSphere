import { Request, Response } from "express";
import Order from "../models/order.model";
import Cart from "../models/cart.model";
import Address from "../models/address.model";
import Product from "../models/Product.model";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";

export const createOrder = asyncHandler(
  async (req: Request, res: Response) => {
    const { addressId, paymentMethod } = req.body;

    if (!addressId) {
      throw new ApiError(400, "Address is required");
    }

    const address = await Address.findOne({
      _id: addressId,
      user: req.user?._id,
    });

    if (!address) {
      throw new ApiError(404, "Address not found");
    }

    const cart = await Cart.findOne({
      user: req.user?._id,
    }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      throw new ApiError(400, "Cart is empty");
    }

    let totalAmount = 0;

    const orderItems = [];

    for (const item of cart.items) {
      const product = await Product.findById(item.product);

      if (!product) {
        throw new ApiError(404, "Product not found");
      }

      if (item.quantity > product.stock) {
        throw new ApiError(
          400,
          `${product.name} has only ${product.stock} items in stock`
        );
      }

      totalAmount += product.price * item.quantity;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });

      product.stock -= item.quantity;

      await product.save();
    }

    const order = await Order.create({
      user: req.user?._id,
      items: orderItems,
      shippingAddress: addressId,
      totalAmount,
      paymentMethod: paymentMethod || "COD",
    });

    cart.items = [];

    await cart.save();

    return res.status(201).json(
      new ApiResponse(
        201,
        order,
        "Order placed successfully"
      )
    );
  }
);

export const getMyOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const orders = await Order.find({
      user: req.user?._id,
    })
      .populate("items.product")
      .populate("shippingAddress");

    return res.status(200).json(
      new ApiResponse(
        200,
        orders,
        "Orders fetched successfully"
      )
    );
  }
);

export const getOrderById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const order = await Order.findOne({
      _id: id,
      user: req.user?._id,
    })
      .populate("items.product")
      .populate("shippingAddress");

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        order,
        "Order fetched successfully"
      )
    );
  }
);

export const updateOrderStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const { orderStatus } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus,
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        order,
        "Order status updated successfully"
      )
    );
  }
);