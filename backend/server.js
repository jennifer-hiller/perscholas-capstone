import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
await mongoose.connect(process.env.ATLAS_URI);
console.log("Connected to MongoDB");
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Turning off autoindexing for production
// mongoose.set("autoIndex", false);
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import userRoutes from "./routes/user.js";
import taskRoutes from "./routes/task.js";
import commentRoutes from "./routes/comment.js";

app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/comment", commentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
