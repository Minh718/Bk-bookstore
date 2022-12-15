import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";

const port = 8800;
const app = express();

app.use(cors());
app.use(morgan("common"));
app.use(express.json());
app.use((req, res) => res.send("fdsfds"));

app.use("/api/users", userRouter);
app.listen(port, (req, res) => {
  console.log("đã kết nối cỗng 8800");
});
