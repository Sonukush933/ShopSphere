import {
  getCache,
  setCache,
  deleteCache,
  deleteCacheByPattern,
} from '../services/cache.service';
import { CACHE_KEYS } from '../utils/cacheKeys';
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/cloudinary';
import { Express } from 'express';
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

    const files = (req.files as Express.Multer.File[]) || [];

    const uploadedImages: { url: string; alt: string }[] = [];

    for (const file of files) {
      const result = await uploadOnCloudinary(file.path);

      if (result) {
        uploadedImages.push({
          url: result.secure_url,
          alt: file.originalname,
        });
      }
    }

    if (uploadedImages.length === 0) {
      throw new ApiError(400, 'Please upload at least one product image');
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
      images: uploadedImages,
      isFeatured,
      isPublished,
      createdBy: req.user?._id,
    });

    // ✅ Clear all product cache
    await deleteCacheByPattern('products:*');

    console.log('🗑 Product cache cleared after CREATE');

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

    const cacheKey = CACHE_KEYS.PRODUCTS(req.query);

    const cachedProducts = await getCache(cacheKey);

    if (cachedProducts) {
      console.log('🟢 Cache HIT');

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            cachedProducts,
            'Products fetched from Redis Cache',
          ),
        );
    }

    console.log('🟡 Cache MISS');

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

    const responseData = {
      products,
      pagination: {
        totalProducts,
        currentPage,
        totalPages: Math.ceil(totalProducts / perPage),
        limit: perPage,
      },
    };

    await setCache(cacheKey, responseData, 300);

    return res
      .status(200)
      .json(
        new ApiResponse(200, responseData, 'Products fetched successfully'),
      );
  },
);

export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const cacheKey = CACHE_KEYS.PRODUCT_BY_ID(id);

    const cachedProduct = await getCache(cacheKey);

    if (cachedProduct) {
      console.log('🟢 Product Cache HIT');

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            cachedProduct,
            'Product fetched from Redis Cache',
          ),
        );
    }

    console.log('🟡 Product Cache MISS');

    const product = await Product.findById(id)
      .populate('category', 'name slug')
      .populate('createdBy', 'name email');

    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    // ✅ Save product in Redis for 5 minutes
    await setCache(cacheKey, product, 300);

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
      isFeatured,
      isPublished,
    } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    if (category) {
      const categoryExists = await Category.findById(category);

      if (!categoryExists) {
        throw new ApiError(404, 'Category not found');
      }
    }

    const files = (req.files as Express.Multer.File[]) || [];

    let uploadedImages = product.images;

    if (files.length > 0) {
      for (const image of product.images) {
        await deleteFromCloudinary(image.url);
      }

      uploadedImages = [];

      for (const file of files) {
        const result = await uploadOnCloudinary(file.path);

        if (result) {
          uploadedImages.push({
            url: result.secure_url,
            alt: file.originalname,
          });
        }
      }
    }

    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.discountPrice = discountPrice ?? product.discountPrice;
    product.stock = stock ?? product.stock;
    product.sku = sku ?? product.sku;
    product.brand = brand ?? product.brand;
    product.category = category ?? product.category;
    product.images = uploadedImages;
    product.isFeatured = isFeatured ?? product.isFeatured;
    product.isPublished = isPublished ?? product.isPublished;

    await product.save();

    // ✅ Clear all product cache
    await deleteCacheByPattern('products:*');
    await deleteCache(CACHE_KEYS.PRODUCT_BY_ID(product._id.toString()));

    console.log('🗑 Product cache cleared after UPDATE');

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

    // ✅ Clear all product-related cache
    await deleteCacheByPattern('products:*');
    await deleteCache(CACHE_KEYS.PRODUCT_BY_ID(id));

    console.log('🗑 Product cache cleared after DELETE');

    return res
      .status(200)
      .json(new ApiResponse(200, {}, 'Product deleted successfully'));
  },
);
