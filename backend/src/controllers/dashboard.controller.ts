import { Request, Response } from 'express';
import User from '../models/User.model';
import Product from '../models/Product.model';
import Order from '../models/order.model';
import asyncHandler from '../utils/asyncHandler';
import ApiResponse from '../utils/ApiResponse';

export const getDashboardStats = asyncHandler(
  async (req: Request, res: Response) => {
    const [totalUsers, totalProducts, totalOrders] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
    ]);

    const revenue = await Order.aggregate([
      {
        $match: {
          paymentStatus: 'Paid',
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: '$finalAmount',
          },
        },
      },
    ]);

    const totalRevenue = revenue.length > 0 ? revenue[0].totalRevenue : 0;

    const pendingOrders = await Order.countDocuments({
      orderStatus: 'Pending',
    });

    const confirmedOrders = await Order.countDocuments({
      orderStatus: 'Confirmed',
    });

    const shippedOrders = await Order.countDocuments({
      orderStatus: 'Shipped',
    });

    const deliveredOrders = await Order.countDocuments({
      orderStatus: 'Delivered',
    });

    const cancelledOrders = await Order.countDocuments({
      orderStatus: 'Cancelled',
    });

    const latestOrders = await Order.find()
      .populate('user', 'name email')
      .select(
        'finalAmount orderStatus paymentStatus paymentMethod createdAt user',
      )
      .sort({
        createdAt: -1,
      })
      .limit(5);

    const topSellingProducts = await Order.aggregate([
      {
        $unwind: '$items',
      },
      {
        $group: {
          _id: '$items.product',
          totalSold: {
            $sum: '$items.quantity',
          },
          totalRevenue: {
            $sum: {
              $multiply: ['$items.price', '$items.quantity'],
            },
          },
        },
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product',
        },
      },
      {
        $unwind: '$product',
      },
      {
        $project: {
          _id: 0,
          productId: '$product._id',
          productName: '$product.name',
          productImage: {
            $arrayElemAt: ['$product.images.url', 0],
          },
          totalSold: 1,
          totalRevenue: 1,
        },
      },
      {
        $sort: {
          totalSold: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    const monthlySales = await Order.aggregate([
      {
        $match: {
          paymentStatus: 'Paid',
        },
      },
      {
        $group: {
          _id: {
            year: {
              $year: '$createdAt',
            },
            month: {
              $month: '$createdAt',
            },
          },
          totalOrders: {
            $sum: 1,
          },
          totalRevenue: {
            $sum: '$finalAmount',
          },
        },
      },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          month: '$_id.month',
          totalOrders: 1,
          totalRevenue: 1,
        },
      },
      {
        $sort: {
          year: 1,
          month: 1,
        },
      },
    ]);

    const lowStockProducts = await Product.find({
      stock: {
        $lte: 5,
      },
    })
      .select('name stock brand images.url')
      .sort({
        stock: 1,
      })
      .limit(5);

    const topCustomers = await Order.aggregate([
      {
        $group: {
          _id: '$user',
          totalOrders: {
            $sum: 1,
          },
          totalSpent: {
            $sum: '$finalAmount',
          },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $project: {
          _id: 0,
          userId: '$user._id',
          name: '$user.name',
          email: '$user.email',
          totalOrders: 1,
          totalSpent: 1,
        },
      },
      {
        $sort: {
          totalSpent: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          totalUsers,
          totalProducts,
          totalOrders,
          totalRevenue,

          pendingOrders,
          confirmedOrders,
          shippedOrders,
          deliveredOrders,
          cancelledOrders,
          latestOrders,
          topSellingProducts,
          monthlySales,
          lowStockProducts,
          topCustomers,
        },
        'Dashboard statistics fetched successfully',
      ),
    );
  },
);
