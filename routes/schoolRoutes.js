import express from "express";
import {
  getAllSchools,
  createSchool,
} from "../controllers/schoolController.js";
import schoolValidationRules from "../validators/schoolValidator.js";

const router = express.Router();

router.post("/addSchool", schoolValidationRules, createSchool);
router.get("/listSchools", getAllSchools);

export default router;
