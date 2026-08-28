const express = require("express");

const workoutController = require("../controllers/workoutController");
const { verify } = require("../auth");

const router = express.Router();

router.post(
    "/addWorkout",
    verify,
    workoutController.addWorkout
);

router.get(
    "/getMyWorkouts",
    verify,
    workoutController.getMyWorkouts
);

router.patch(
    "/updateWorkout",
    verify,
    workoutController.updateWorkout
);

router.delete(
    "/deleteWorkout",
    verify,
    workoutController.deleteWorkout
);

router.patch(
    "/completeWorkoutStatus",
    verify,
    workoutController.completeWorkoutStatus
);

module.exports = router;