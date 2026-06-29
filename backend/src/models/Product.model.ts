import mongoose from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  stock: number;
  brand: string;
  category: mongoose.Types.ObjectId;
  images: string[];
  ratings: number;
  numReviews: number;
  isFeatured: boolean;
  isPublished: boolean;
  createdBy: mongoose.Types.ObjectId;
}
