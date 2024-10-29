import express from "express";
import env from "dotenv";
import bodyParser from "body-parser";
import userRouter from "../routes/user.route.js";
// dotenv configaration
env.config({
  path: "./.env",
});
//constant
const app = express();
const PORT = process.env.PORT;
//middlewares
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));
app.use(bodyParser.json());

//Routes middleware
app.use("/api/v1", userRouter); // http://localhost:4000/api/v1/users

app.get("/", async (req, res) => {});

app.listen(PORT, () => {
  console.log(`API is running at PORT: ${PORT}`);
});
