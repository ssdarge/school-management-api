import pool from "../config/db.js";
import { validationResult } from "express-validator";

const getAllSchools = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM schools");

    if (rows.length === 0) {
      return res.status(404).json({ message: "no schools found" });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error while fetching schools", error);
    res.status(500).json({ error: "Database Error", message: error.message });
  }
};

const createSchool = async (req, res) => {
  const errors = validationResult(req);
  if (!error.isEmpty()) {
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
      .json({ message: "School added successfully", id: result.insertedId });
  } catch (error) {
    console.error("Error creating school", error.message);
    res
      .status(500)
      .json({ error: "Error creating school", message: error.message });
  }
};

export { getAllSchools, createSchool };
