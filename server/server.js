const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "https://zepnest-project-hspj.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// IMPORTANT: Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const authRoutes = require("./routes/authRoutes");
const requestRoutes = require("./routes/requestRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});