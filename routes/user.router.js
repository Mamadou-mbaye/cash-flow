import express from "express";
import {
  createRecordController,
  getRecordController,
  udpateRecordController,
  deleteRecordController,
  clearRecordsController,
} from "../controllers/user.controller.js";

const router = express.Router();
router.post("/create", createRecordController);
router.get("/get/:id", getRecordController);
router.patch("/update/:id", udpateRecordController);
router.delete("/delete/:id", deleteRecordController);
router.delete("/clear", clearRecordsController);
export { router };
