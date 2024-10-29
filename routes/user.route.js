import express from "express";
import {
  getAllData,
  getSpecificData,
  postData,
  updateData,
  deleteData,
} from "../controllers/user.controller.js";

const router = express.Router();

//getting all the data
router.get("/users", getAllData);

//getting a data by specific id
router.get("/users/:id", getSpecificData);

//posting data
router.post("/users", postData);

//updating data
router.put("/users/:id", updateData);

//deleting data
router.delete("/users/:id", deleteData);

export default router;
