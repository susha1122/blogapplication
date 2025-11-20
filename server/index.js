import express from "express";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import connectDB from "./lib/connectDB.js";
import dotenv from "dotenv";
import webHookRouter from "./routes/webhook.route.js";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

// CORS - allow the client origin (set in .env)
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

// Webhook route must receive raw body for signature verification.
app.use('/api/webhook', bodyParser.raw({ type: '*/*' }));

// After that, normal json parsing for other routes
app.use(express.json());

// Clerk middleware for protecting routes and providing req.auth()
app.use(clerkMiddleware());

// Optional: safety headers (CORS already handles most)
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   next();
// });

// Routes
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

// Global error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message || "Something went wrong!",
    status: error.status,
    stack: error.stack,
  });
});

const PORT = process.env.PORT || 3000;

// Start server only after DB connection
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to DB', error);
    process.exit(1);
  }
};

startServer();
