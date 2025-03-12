import express from "express";
import {
  getAllSchools,
  createSchool,
} from "../controllers/schoolController.js";

const router = express.Router();

router.post("/addSchool", createSchool);
router.get("/listSchools", getAllSchools);

export default router;
