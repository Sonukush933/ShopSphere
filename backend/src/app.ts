import express from 'express';
import authRoutes from './routes/auth.routes';
import errorMiddleware from './middleware/error.middleware';
import cookieParser from "cookie-parser";

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



app.use(errorMiddleware);
export default app;
