import slugify from "slugify";
import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  description: string;
  image: string;
  isActive: boolean;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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

    image: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.pre("validate", function () {
  if (!this.isModified("name")) {
    return;
  }

  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
    trim: true,
  });
});

categorySchema.index({
  name: "text",
  description: "text",
});

const Category = mongoose.model<ICategory>(
  "Category",
  categorySchema
);

export default Category;