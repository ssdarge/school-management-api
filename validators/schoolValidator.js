import { check } from "express-validator";

const schoolValidationRules = [
  check("name").notEmpty().withMessage("Name is required"),
  check("address").notEmpty().withMessage("Address is required"),
  check("latitude").isFloat().withMessage("Latitude must be a number"),
  check("longitude").isFloat().withMessage("Longitude must be a number"),
];

export default schoolValidationRules;
