import express from 'express';
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.routes';
import productRoutes from "./routes/product.routes";
import errorMiddleware from './middleware/error.middleware';
import categoryRoutes from './routes/category.routes'
import cartRoutes from "./routes/cart.routes";
import addressRoutes from "./routes/address.routes";
import orderRoutes from "./routes/order.routes";
import wishlistRoutes from "./routes/wishlist.routes";
import reviewRoutes from "./routes/review.routes";
import couponRoutes from './routes/coupon.routes';
import paymentRoutes from './routes/payment.routes';


const app = express();
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'ShopSphere API Running',
  });
});

app.use('/api/auth', authRoutes);
app.use("/api/products", productRoutes)
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/reviews", reviewRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/payments', paymentRoutes);


app.use(errorMiddleware);
export default app;
