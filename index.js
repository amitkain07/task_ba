import express from "express";
import dotenv from "dotenv";
import connect from "./db/Connect.js";
import user from './routes/user.js'
import post from './routes/post.js'
import notFound from "./middleware/not_found.js";
import errorHandlerMiddleware from "./middleware/error_handler.js";
import cors from 'cors'
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
  res.json("hello there");
});


app.use(user);
app.use(post)
app.use(notFound)
app.use(errorHandlerMiddleware)

const PORT = 4000;

const Start = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log("connected to db!");
    app.listen(PORT, () => {
      console.log(`server is listening at port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

Start();
