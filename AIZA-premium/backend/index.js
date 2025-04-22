import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRoute from './routes/product.route.js';
import userRoute from './routes/user.route.js';
import orderRoute from './routes/order.route.js';
import cors from 'cors';
import passport from './config/passport.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
const URI = process.env.MONGODB_URI;

// Database connection
(async () => {
  try {
    await mongoose.connect(URI);
    console.log("Database Connected");
  } catch (error) {
    console.log("Error: ", error.message);
  }
})(  );


app.use(cors());
// Add middleware for JSON
app.use(express.json());

// Define routes
app.use('/products', productRoute);
app.use('/user', userRoute);
app.use('/order', orderRoute);

app.use(passport.initialize());

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
