import { Request, Response } from 'express';
import Wishlist from '../models/wishlist.model';
import Product from '../models/Product.model';
import asyncHandler from '../utils/asyncHandler';
import ApiError from '../utils/ApiError';
import ApiResponse from '../utils/ApiResponse';

// Add Product To Wishlist
export const addToWishlist = asyncHandler(
  async (req: Request, res: Response) => {
    const { productId } = req.body;

    if (!productId) {
      throw new ApiError(400, 'Product is required');
    }

    const product = await Product.findById(productId);

    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    let wishlist = await Wishlist.findOne({
      user: req.user?._id,
    });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user?._id,
        products: [productId],
      });
    } else {
      const alreadyExists = wishlist.products.some(
        (id) => id.toString() === productId,
      );

      if (alreadyExists) {
        throw new ApiError(400, 'Product already exists in wishlist');
      }

      wishlist.products.push(product._id);

      await wishlist.save();
    }

    const populatedWishlist = await Wishlist.findById(wishlist._id)
      .populate('user', 'name email')
      .populate('products');

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          populatedWishlist,
          'Product added to wishlist successfully',
        ),
      );
  },
);

// Get My Wishlist
export const getMyWishlist = asyncHandler(
  async (req: Request, res: Response) => {
    const wishlist = await Wishlist.findOne({
      user: req.user?._id,
    })
      .populate('user', 'name email')
      .populate('products');

    if (!wishlist) {
      throw new ApiError(404, 'Wishlist not found');
    }

    return res
      .status(200)
      .json(new ApiResponse(200, wishlist, 'Wishlist fetched successfully'));
  },
);

// Remove Product From Wishlist
export const removeFromWishlist = asyncHandler(
  async (req: Request, res: Response) => {
    const { productId } = req.body;

    if (!productId) {
      throw new ApiError(400, 'Product is required');
    }

    const wishlist = await Wishlist.findOne({
      user: req.user?._id,
    });

    if (!wishlist) {
      throw new ApiError(404, 'Wishlist not found');
    }

    const exists = wishlist.products.some((id) => id.toString() === productId);

    if (!exists) {
      throw new ApiError(404, 'Product not found in wishlist');
    }

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId,
    );

    await wishlist.save();

    const populatedWishlist = await Wishlist.findById(wishlist._id)
      .populate('user', 'name email')
      .populate('products');

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          populatedWishlist,
          'Product removed from wishlist successfully',
        ),
      );
  },
);

// Clear Wishlist
export const clearWishlist = asyncHandler(
  async (req: Request, res: Response) => {
    const wishlist = await Wishlist.findOne({
      user: req.user?._id,
    });

    if (!wishlist) {
      throw new ApiError(404, 'Wishlist not found');
    }

    wishlist.products = [];

    await wishlist.save();

    return res
      .status(200)
      .json(new ApiResponse(200, {}, 'Wishlist cleared successfully'));
  },
);
