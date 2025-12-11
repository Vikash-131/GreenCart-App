import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import { stripeWebhooks } from './controllers/orderController.js';

const app = express();
const port = process.env.PORT || 4000;

await connectDB();
await connectCloudinary();

// Allow localhost origins in development (accept any localhost port)
// This is convenient during local dev when Vite may pick different ports.
// Keep this restrictive in production.
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);

    // Accept any http://localhost:<port> origin during development
    if (origin.startsWith('http://localhost:5173','https://greencart-three-eta.vercel.app')) return callback(null, true);

    // otherwise fall back to rejecting unknown origins
    return callback(new Error('CORS policy does not allow this origin'), false);
  },
  credentials: true
}));
app.post('/stripe', express.raw({type: 'application/json'}),stripeWebhooks); // Stripe Webhook needs the raw body

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => res.send("API is Working"));
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

// Log all routes for debugging
console.log("Routes registered:")
console.log("- /api/user");
console.log("- /api/seller");
console.log("- /api/product");
console.log("- /api/cart");
console.log("- /api/address");
console.log("- /api/order");

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
