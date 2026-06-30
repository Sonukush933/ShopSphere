import Cart from '../models/cart.model';

export const getPopulatedCart = async (userId: string) => {
  const cart = await Cart.findOne({
    user: userId,
  })
    .populate('user', 'name email')
    .populate('items.product', 'name price discountPrice images stock brand');

  const totalItems = cart?.items.length || 0;

  let totalQuantity = 0;
  let totalPrice = 0;

  cart?.items.forEach((item: any) => {
    totalQuantity += item.quantity;
    totalPrice += item.quantity * item.product.price;
  });

  return {
    cart,
    totalItems,
    totalQuantity,
    totalPrice,
  };
};
