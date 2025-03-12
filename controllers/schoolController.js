import { validationResult } from "express-validator";
import pool from "../config/db.js";
import calculateDistance from "../utils/distanceCalculator.js";

const getAllSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude are required" });
  }

  try {
    const [schools] = await pool.query("SELECT * FROM schools");

    if (schools.length === 0) {
      return res.status(404).json({ message: "no schools found" });
    }

    const sortedSchools = schools
      .map((school) => ({
        ...school,
        distance: calculateDistance(
          latitude,
          longitude,
          school.latitude,
          school.longitude
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    res.status(200).json(sortedSchools);
  } catch (error) {
    console.error("Error while fetching schools", error);
    res.status(500).json({ error: "Database Error", message: error.message });
  }
};

const createSchool = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { name, address, latitude, longitude } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name, address, latitude, longitude]
    );

    res
      .status(201)
      .json({ message: "School added successfully", id: result.insertId });
  } catch (error) {
    console.error("Error creating school", error.message);
    res
      .status(500)
      .json({ error: "Error creating school", message: error.message });
  }
};

export { getAllSchools, createSchool };
