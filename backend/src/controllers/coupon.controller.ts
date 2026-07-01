import Cart from '../models/cart.model';
import { Request, Response } from 'express';
import Coupon from '../models/coupon.model';
import asyncHandler from '../utils/asyncHandler';
import ApiError from '../utils/ApiError';
import ApiResponse from '../utils/ApiResponse';

export const createCoupon = asyncHandler(
  async (req: Request, res: Response) => {
    const { code, discount, minOrderAmount, expiryDate, isActive } = req.body;

    if (!code || !discount || !expiryDate) {
      throw new ApiError(400, 'Code, discount and expiry date are required');
    }

    const existingCoupon = await Coupon.findOne({
      code: code.toUpperCase(),
    });

    if (existingCoupon) {
      throw new ApiError(400, 'Coupon already exists');
    }

    const coupon = await Coupon.create({
      code: code.toUpperCase(),
      discount,
      minOrderAmount,
      expiryDate,
      isActive,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, coupon, 'Coupon created successfully'));
  },
);

export const getAllCoupons = asyncHandler(
  async (req: Request, res: Response) => {
    const coupons = await Coupon.find().sort({
      createdAt: -1,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, coupons, 'Coupons fetched successfully'));
  },
);

export const getCouponById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const coupon = await Coupon.findById(id);

    if (!coupon) {
      throw new ApiError(404, 'Coupon not found');
    }

    return res
      .status(200)
      .json(new ApiResponse(200, coupon, 'Coupon fetched successfully'));
  },
);

export const updateCoupon = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const { code, discount, minOrderAmount, expiryDate, isActive } = req.body;

    const coupon = await Coupon.findById(id);

    if (!coupon) {
      throw new ApiError(404, 'Coupon not found');
    }

    if (code && code.toUpperCase() !== coupon.code) {
      const existingCoupon = await Coupon.findOne({
        code: code.toUpperCase(),
      });

      if (existingCoupon) {
        throw new ApiError(400, 'Coupon code already exists');
      }
    }

    coupon.code = code ? code.toUpperCase() : coupon.code;
    coupon.discount = discount ?? coupon.discount;
    coupon.minOrderAmount = minOrderAmount ?? coupon.minOrderAmount;
    coupon.expiryDate = expiryDate ?? coupon.expiryDate;
    coupon.isActive = isActive ?? coupon.isActive;

    await coupon.save();

    return res
      .status(200)
      .json(new ApiResponse(200, coupon, 'Coupon updated successfully'));
  },
);

export const deleteCoupon = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const coupon = await Coupon.findById(id);

    if (!coupon) {
      throw new ApiError(404, 'Coupon not found');
    }

    await coupon.deleteOne();

    return res
      .status(200)
      .json(new ApiResponse(200, {}, 'Coupon deleted successfully'));
  },
);

export const applyCoupon = asyncHandler(async (req: Request, res: Response) => {
  const { code } = req.body;

  if (!code) {
    throw new ApiError(400, 'Coupon code is required');
  }

  const coupon = await Coupon.findOne({
    code: code.toUpperCase(),
  });

  if (!coupon) {
    throw new ApiError(404, 'Coupon not found');
  }
  if (!coupon.isActive) {
    throw new ApiError(400, 'Coupon is inactive');
  }
  if (coupon.expiryDate < new Date()) {
    throw new ApiError(400, 'Coupon has expired');
  }

  const cart = await Cart.findOne({ user: req.user?._id }).populate(
    'items.product',
  );

  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, 'Cart is empty');
  }

  const cartTotal = cart.items.reduce((total, item) => {
    const product = item.product as any;

   const itemPrice = product.discountPrice ?? product.price;

    return total + itemPrice * item.quantity;
  }, 0);

  if (cartTotal < coupon.minOrderAmount) {
    throw new ApiError(
      400,
      `Minimum order amount should be ₹${coupon.minOrderAmount} to apply this coupon`,
    );
  }
  const discountAmount = (cartTotal * coupon.discount) / 100;

  const finalAmount = cartTotal - discountAmount;

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        coupon: coupon.code,
        cartTotal,
        discountPercentage: coupon.discount,
        discountAmount,
        finalAmount,
      },
      'Coupon applied successfully',
    ),
  );
});
