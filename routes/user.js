import express from "express";
import { SignIn, SignUp } from "../controllers/user.js";

const router = express.Router();

router.route("/api/register").post(SignUp);
router.route("/api/login").post(SignIn);

export default router;

