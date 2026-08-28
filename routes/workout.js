const express = require("express");
const router = express.Router();

const {
    addWorkout,
    getMyWorkouts,
    updateWorkout,
    deleteWorkout,
    completeWorkoutStatus
} = require("../controllers/workout");
const { verify } = require("../auth/auth");

// POST /workouts/addWorkout
router.post("/addWorkout", verify, addWorkout);

// GET /workouts/getMyWorkouts
router.get("/getMyWorkouts", verify, getMyWorkouts);

// PATCH /workouts/updateWorkout/:workoutId
router.patch("/updateWorkout/:workoutId", verify, updateWorkout);

// DELETE /workouts/deleteWorkout/:workoutId
router.delete("/deleteWorkout/:workoutId", verify, deleteWorkout);

// PATCH /workouts/completeWorkoutStatus/:workoutId
router.patch("/completeWorkoutStatus/:workoutId", verify, completeWorkoutStatus);

module.exports = router;
