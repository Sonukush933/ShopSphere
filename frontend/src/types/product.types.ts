export interface Category {
  _id: string;
  name: string;
  slug: string;
}

export interface ProductImage {
  url: string;
  alt: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  stock: number;
  sku: string;
  brand: string;
  category: Category;
  images: ProductImage[];
  ratings: number;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  totalProducts: number;
  currentPage: number;
  totalPages: number;
  limit: number;
}

export interface ProductsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    products: Product[];
    pagination: Pagination;
  };
}
