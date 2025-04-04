import express from "express";
import dotenv from "dotenv";
import connect from "./db/Connect.js";
import user from './routes/user.js';
import post from './routes/post.js';
import notFound from "./middleware/not_found.js";
import errorHandlerMiddleware from "./middleware/error_handler.js";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Fix for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.json("hello there");
});

app.use( user);
app.use( post);

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handling
app.use(notFound);
app.use(errorHandlerMiddleware);

// Server start
const PORT = process.env.PORT || 4000;

const Start = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log("✅ Connected to DB!");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
  }
};

Start();
