import { Request, Response } from 'express';
import Category from '../models/Category.model';
import asyncHandler from '../utils/asyncHandler';
import ApiError from '../utils/ApiError';
import ApiResponse from '../utils/ApiResponse';

export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, description, image, isActive } = req.body;

    if (!name || !description) {
      throw new ApiError(400, 'Name and description are required');
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      throw new ApiError(400, 'Category already exists');
    }

    const category = await Category.create({
      name,
      description,
      image,
      isActive,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, category, 'Category created successfully'));
  },
);

export const getAllCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = await Category.find();

    return res
      .status(200)
      .json(
        new ApiResponse(200, categories, 'Categories fetched successfully'),
      );
  },
);

export const getCategoryById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      throw new ApiError(404, 'Category not found');
    }

    return res
      .status(200)
      .json(new ApiResponse(200, category, 'Category fetched successfully'));
  },
);

export const updateCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, image, isActive } = req.body;
    const category = await Category.findByIdAndUpdate(
      id,
      {
        name,
        description,
        image,
        isActive,
      },
      {
        returnDocument: 'after',
        runValidators: true,
      },
    );
    if (!category) {
      throw new ApiError(404, 'Category not found');
    }
    return res
      .status(200)
      .json(new ApiResponse(200, category, 'Category updated successfully'));
  },
);

export const deleteCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      throw new ApiError(404, 'Category not found');
    }

    return res
      .status(200)
      .json(new ApiResponse(200, {}, 'Category deleted successfully'));
  },
);
