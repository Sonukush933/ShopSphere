import { Request, Response } from 'express';
import Product from '../models/Product.model';
import asyncHandler from '../utils/asyncHandler';
import ApiError from '../utils/ApiError';
import ApiResponse from '../utils/ApiResponse';

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      name,
      description,
      price,
      discountPrice,
      stock,
      sku,
      brand,
      category,
      images,
      isFeatured,
      isPublished,
    } = req.body;

    if (!name || !description || !price || !stock || !brand || !category) {
      throw new ApiError(400, 'All required fields are required');
    }

    const product = await Product.create({
      name,
      description,
      price,
      discountPrice,
      stock,
      sku,
      brand,
      category,
      images,
      isFeatured,
      isPublished,
      createdBy: req.user?._id,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, product, 'Product created successfully'));
  },
);

export const getAllProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await Product.find();

    return res
      .status(200)
      .json(new ApiResponse(200, products, 'Products fetched successfully'));
  },
);

export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    return res
      .status(200)
      .json(new ApiResponse(200, product, 'Product fetched successfully'));
  },
);

export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const {
      name,
      description,
      price,
      discountPrice,
      stock,
      sku,
      brand,
      category,
      images,
      isFeatured,
      isPublished,
    } = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        discountPrice,
        stock,
        sku,
        brand,
        category,
        images,
        isFeatured,
        isPublished,
      },
      {
        returnDocument: 'after',
        runValidators: true,
      },
    );

    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    return res
      .status(200)
      .json(new ApiResponse(200, product, 'Product updated successfully'));
  },
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    return res
      .status(200)
      .json(new ApiResponse(200, {}, 'Product deleted successfully'));
  },
);
