import Post from "../models/postSchema.js";
import upload from "../middleware/imageuplaod.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Needed to resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";
    const newPost = new Post({ title, content, image, author: req.user.id });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    // Update title and content
    post.title = req.body.title;
    post.content = req.body.content;

    // If a new image is uploaded
    if (req.file) {
      // Delete old image from the uploads folder
      if (post.image) {
        const oldImagePath = path.join(__dirname, "..", post.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Save new image path
      post.image = `/uploads/${req.file.filename}`;
    }

    await post.save();
    res.status(200).json(post);
  } catch (err) {
    console.error("Update error:", err.message);
    res.status(500).json({ error: "Server error while updating post." });
  }
};

const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ error: "Post not found" });
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createPost, getPosts, getPostById, updatePost, deletePost };
