require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user");
const workoutRoutes = require("./routes/workout");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://fitnessapp-vue.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

// ROUTES
app.use("/users", userRoutes);
app.use("/workouts", workoutRoutes);

// MONGODB CONNECTION
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        if (require.main === module) {
            app.listen(process.env.PORT || 4000, () => {
                console.log(
                    `API is now online on port ${
                        process.env.PORT || 4000
                    }`
                );
            });
        }
    })
    .catch(error => {
        console.log("MongoDB connection error:", error);
    });

module.exports = {
    app,
    mongoose
};