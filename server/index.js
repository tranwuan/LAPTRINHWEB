import express from 'express';
import cors from 'cors';
import connectToMongoDB from './db/db.js';
import authRouter from './routes/Auth.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON

// Routes
app.use('/api/auth', authRouter);

// Kết nối MongoDB và khởi động server
const startServer = async () => {
  try {
    await connectToMongoDB(); // Đảm bảo kết nối MongoDB trước
    console.log("Connected to MongoDB");

    app.listen(5000, () => {
      connectToMongoDB()
      console.log("Server is running on port 5000");
    });
  } catch (error) {
    console.error("Error starting server:", error.message);
    process.exit(1); // Dừng server nếu có lỗi
  }
};

startServer();
