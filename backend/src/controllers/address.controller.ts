import { Request, Response } from 'express';
import Address from '../models/address.model';
import asyncHandler from '../utils/asyncHandler';
import ApiError from '../utils/ApiError';
import ApiResponse from '../utils/ApiResponse';

// Create Address
export const createAddress = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      isDefault,
    } = req.body;

    if (
      !fullName ||
      !phone ||
      !addressLine1 ||
      !city ||
      !state ||
      !postalCode
    ) {
      throw new ApiError(400, 'All required fields are required');
    }

    if (isDefault) {
      await Address.updateMany({ user: req.user?._id }, { isDefault: false });
    }

    const address = await Address.create({
      user: req.user?._id,
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      isDefault,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, address, 'Address created successfully'));
  },
);

// Get All Addresses
export const getMyAddresses = asyncHandler(
  async (req: Request, res: Response) => {
    const addresses = await Address.find({
      user: req.user?._id,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, addresses, 'Addresses fetched successfully'));
  },
);

// Get Address By ID
export const getAddressById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const address = await Address.findOne({
      _id: id,
      user: req.user?._id,
    });

    if (!address) {
      throw new ApiError(404, 'Address not found');
    }

    return res
      .status(200)
      .json(new ApiResponse(200, address, 'Address fetched successfully'));
  },
);

// Update Address
export const updateAddress = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (req.body.isDefault) {
      await Address.updateMany({ user: req.user?._id }, { isDefault: false });
    }

    const address = await Address.findOneAndUpdate(
      {
        _id: id,
        user: req.user?._id,
      },
      req.body,
      {
        returnDocument: 'after',
        runValidators: true,
      },
    );

    if (!address) {
      throw new ApiError(404, 'Address not found');
    }

    return res
      .status(200)
      .json(new ApiResponse(200, address, 'Address updated successfully'));
  },
);

// Delete Address
export const deleteAddress = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const address = await Address.findOneAndDelete({
      _id: id,
      user: req.user?._id,
    });

    if (!address) {
      throw new ApiError(404, 'Address not found');
    }

    return res
      .status(200)
      .json(new ApiResponse(200, {}, 'Address deleted successfully'));
  },
);
