console.log("Hello!");

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");

const app = express();

app.use(express.json());

// Routes Middleware
app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    if (require.main === module) {
      app.listen(process.env.PORT || 4000, () => {
        console.log(`API is now online on port ${process.env.PORT || 4000}`);
      });
    }
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

module.exports = {
  app,
  mongoose,
};
