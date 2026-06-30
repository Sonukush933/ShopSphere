import { Request, Response } from 'express';
import Product from '../models/Product.model';
import Category from '../models/Category.model';
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

    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      throw new ApiError(404, 'Category not found');
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
    const {
      search,
      category,
      minPrice,
      maxPrice,
      rating,
      inStock,
      featured,
      sort,
      page = '1',
      limit = '10',
    } = req.query;

    const filter: any = {};

    // Search
    if (search) {
      filter.name = {
        $regex: search,
        $options: 'i',
      };
    }

    // Category
    if (category) {
      filter.category = category;
    }

    // Price Filter
    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    // Rating Filter
    if (rating) {
      filter.ratings = {
        $gte: Number(rating),
      };
    }

    // Stock Filter
    if (inStock === 'true') {
      filter.stock = {
        $gt: 0,
      };
    }

    // Featured Products
    if (featured === 'true') {
      filter.isFeatured = true;
    }

    let query = Product.find(filter)
      .populate('category', 'name slug')
      .populate('createdBy', 'name email');

    // Sorting
    switch (sort) {
      case 'price_asc':
        query = query.sort({ price: 1 });
        break;

      case 'price_desc':
        query = query.sort({ price: -1 });
        break;

      case 'latest':
        query = query.sort({ createdAt: -1 });
        break;

      case 'rating':
        query = query.sort({ ratings: -1 });
        break;

      default:
        query = query.sort({ createdAt: -1 });
    }

    const currentPage = Number(page);
    const perPage = Number(limit);

    const totalProducts = await Product.countDocuments(filter);

    const products = await query
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          products,
          pagination: {
            totalProducts,
            currentPage,
            totalPages: Math.ceil(totalProducts / perPage),
            limit: perPage,
          },
        },
        'Products fetched successfully',
      ),
    );
  },
);

export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate('category', 'name slug')
      .populate('createdBy', 'name email');

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
