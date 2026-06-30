import { Request, Response } from 'express';
import Review from '../models/review.model';
import Product from '../models/Product.model';
import asyncHandler from '../utils/asyncHandler';
import ApiError from '../utils/ApiError';
import ApiResponse from '../utils/ApiResponse';

const updateProductRatings = async (productId: string) => {
  const reviews = await Review.find({ product: productId });

  const numReviews = reviews.length;

  const averageRating =
    numReviews === 0
      ? 0
      : reviews.reduce((sum, review) => sum + review.rating, 0) / numReviews;

  await Product.findByIdAndUpdate(productId, {
    ratings: Number(averageRating.toFixed(1)),
    numReviews,
  });
};

// Create Review
export const createReview = asyncHandler(
  async (req: Request, res: Response) => {
    const { productId, rating, comment } = req.body;

    if (!productId || !rating || !comment) {
      throw new ApiError(400, 'All fields are required');
    }

    const product = await Product.findById(productId);

    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    const existingReview = await Review.findOne({
      user: req.user?._id,
      product: productId,
    });

    if (existingReview) {
      throw new ApiError(400, 'You have already reviewed this product');
    }

    const review = await Review.create({
      user: req.user?._id,
      product: productId,
      rating,
      comment,
    });

    await updateProductRatings(productId);

    return res
      .status(201)
      .json(new ApiResponse(201, review, 'Review added successfully'));
  },
);

// Get Product Reviews
export const getProductReviews = asyncHandler(
  async (req: Request, res: Response) => {
    const { productId } = req.params;

    const reviews = await Review.find({
      product: productId,
    })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    return res
      .status(200)
      .json(new ApiResponse(200, reviews, 'Reviews fetched successfully'));
  },
);

// Update Review
export const updateReview = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findOneAndUpdate(
      {
        _id: id,
        user: req.user?._id,
      },
      {
        rating,
        comment,
      },
      {
        returnDocument: 'after',
        runValidators: true,
      },
    );

    if (!review) {
      throw new ApiError(404, 'Review not found');
    }

    await updateProductRatings(review.product.toString());

    return res
      .status(200)
      .json(new ApiResponse(200, review, 'Review updated successfully'));
  },
);

// Delete Review
export const deleteReview = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const review = await Review.findOneAndDelete({
      _id: id,
      user: req.user?._id,
    });

    if (!review) {
      throw new ApiError(404, 'Review not found');
    }

    await updateProductRatings(review.product.toString());

    return res
      .status(200)
      .json(new ApiResponse(200, {}, 'Review deleted successfully'));
  },
);
