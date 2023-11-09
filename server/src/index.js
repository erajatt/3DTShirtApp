import express from "express";
import cors from "cors";
import DBConnection from "../database/db.js";
import userRouter from "../routes/userRoute.js";

const app = express();
const port = 3001;

// MiddleWares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ exposedHeaders: ["Content-Disposition"] }));

// Routes
const hi = (req, res) => {
  return res.json("Hiiii.......");
};
const Router = express.Router().get("/", hi);
app.use("/", Router);
app.use("/user", userRouter);

// Database connection
DBConnection();

app.listen(port, () => console.log(`server started on port ${port}!`));
