export const CACHE_KEYS = {
  PRODUCTS: (query: object) => `products:${JSON.stringify(query)}`,

  PRODUCT_BY_ID: (id: string) => `product:${id}`,

  PRODUCTS_BY_CATEGORY: (category: string) => `products:category:${category}`,

  USER_CART: (userId: string) => `cart:${userId}`,

  USER_WISHLIST: (userId: string) => `wishlist:${userId}`,
};
