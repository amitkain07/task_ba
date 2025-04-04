import express from "express";
import authMiddleware from "../middleware/authentication.js";
import {
  getPosts,
  createPost,
  getPostById,
  deletePost,
  updatePost,
} from "../controllers/post.js";
import multer from "multer"; // Import multer for handling file uploads

const router = express.Router();

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" });

router
  .route("/api/posts")
  .post(authMiddleware, upload.single("image"), createPost)
  .get(getPosts);

router
  .route("/api/posts/:id")
  .get(getPostById)
  .put(authMiddleware, updatePost)
  .delete(authMiddleware, deletePost);

export default router;
