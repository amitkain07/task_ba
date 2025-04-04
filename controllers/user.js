import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import User from "../models/userSchema.js";

const SignUp = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const hashpassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: hashpassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET , {
      expiresIn: "7d",
    });
    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { SignIn, SignUp };
