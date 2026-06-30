import { Request, Response } from 'express';
import { getPopulatedCart } from '../utils/cart.utils';
import Cart from '../models/cart.model';
import Product from '../models/Product.model';
import asyncHandler from '../utils/asyncHandler';
import ApiError from '../utils/ApiError';
import ApiResponse from '../utils/ApiResponse';

export const addToCart = asyncHandler(async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;

  if (!productId) {
    throw new ApiError(400, 'Product is required');
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  const requestedQuantity = quantity || 1;

  // Initial stock validation
  if (requestedQuantity > product.stock) {
    throw new ApiError(400, `Only ${product.stock} items available in stock`);
  }

  let cart = await Cart.findOne({
    user: req.user?._id,
  });

  if (!cart) {
    cart = await Cart.create({
      user: req.user?._id,
      items: [
        {
          product: productId,
          quantity: requestedQuantity,
        },
      ],
    });
  } else {
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + requestedQuantity;

      // Total quantity stock validation
      if (newQuantity > product.stock) {
        throw new ApiError(
          400,
          `Only ${product.stock} items available in stock`,
        );
      }

      existingItem.quantity = newQuantity;
    } else {
      cart.items.push({
        product: productId,
        quantity: requestedQuantity,
      });
    }

    await cart.save();
  }

  const populatedCart = await getPopulatedCart(req.user!._id.toString());

  return res
    .status(200)
    .json(
      new ApiResponse(200, populatedCart, 'Product added to cart successfully'),
    );
});

export const getMyCart = asyncHandler(async (req: Request, res: Response) => {
  const cart = await getPopulatedCart(req.user!._id.toString());
  if (!cart) {
    throw new ApiError(404, 'Cart not found');
  }
  return res
    .status(200)
    .json(new ApiResponse(200, cart, 'Cart fetched successfully'));
});

export const updateCartQuantity = asyncHandler(
  async (req: Request, res: Response) => {
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      throw new ApiError(400, 'Product and quantity are required');
    }

    if (quantity < 1) {
      throw new ApiError(400, 'Quantity must be at least 1');
    }

    const product = await Product.findById(productId);

    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    if (quantity > product.stock) {
      throw new ApiError(400, `Only ${product.stock} items available in stock`);
    }

    const cart = await Cart.findOne({
      user: req.user?._id,
    });

    if (!cart) {
      throw new ApiError(404, 'Cart not found');
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (!item) {
      throw new ApiError(404, 'Product not found in cart');
    }

    item.quantity = quantity;

    await cart.save();

    const populatedCart = await getPopulatedCart(req.user!._id.toString());

    return res
      .status(200)
      .json(new ApiResponse(200, populatedCart, 'Cart updated successfully'));
  },
);

export const removeFromCart = asyncHandler(
  async (req: Request, res: Response) => {
    const { productId } = req.body;

    if (!productId) {
      throw new ApiError(400, 'Product is required');
    }

    const cart = await Cart.findOne({
      user: req.user?._id,
    });

    if (!cart) {
      throw new ApiError(404, 'Cart not found');
    }

    const itemExists = cart.items.some(
      (item) => item.product.toString() === productId,
    );

    if (!itemExists) {
      throw new ApiError(404, 'Product not found in cart');
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId,
    );

    await cart.save();

    const populatedCart = await getPopulatedCart(req.user!._id.toString());

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          populatedCart,
          'Product removed from cart successfully',
        ),
      );
  },
);

export const clearCart = asyncHandler(async (req: Request, res: Response) => {
  const cart = await Cart.findOne({
    user: req.user?._id,
  });

  if (!cart) {
    throw new ApiError(404, 'Cart not found');
  }

  cart.items = [];

  await cart.save();

  const populatedCart = await getPopulatedCart(req.user!._id.toString());

  return res
    .status(200)
    .json(new ApiResponse(200, populatedCart, 'Cart cleared successfully'));
});
