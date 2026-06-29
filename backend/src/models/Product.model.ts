import slugify from "slugify"
import mongoose, { Schema, Document  } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice: number;
  stock: number;
  sku: string;
  brand: string;
  category: mongoose.Types.ObjectId;
  images: {
    url: string;
    alt: string;
  }[];
  ratings: number;
  numReviews: number;
  isFeatured: boolean;
  isPublished: boolean;
  createdBy: mongoose.Types.ObjectId;
}


const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    images: [
      {
        url: {
          type: String,
          required: true,
        },
        alt: {
          type: String,
          default: "",
        },
      },
    ],

    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    numReviews: {
      type: Number,
      default: 0,
      min: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.pre("validate", function () {
  if (!this.isModified("name")) {
    return;
  }

  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
    trim: true,
  });
});

productSchema.index({
  name: "text",
  description: "text",
  brand: "text",
});
productSchema.index({
  price: 1,
});
productSchema.index({
  category: 1,
});

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;