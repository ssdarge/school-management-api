import "dotenv/config";
import express from "express";
import cors from "cors";
import schoolRoutes from "./routes/schoolRoutes.js";

const app = express();
const port = process.env.PORT || 3001;

// middlware
app.use(express.json());
app.use(cors());

// routes
app.use("/api", schoolRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
