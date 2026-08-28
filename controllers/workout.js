const Workout = require("../models/Workout");

// POST /workouts/addWorkout
module.exports.addWorkout = async (req, res) => {
    try {
        const { name, duration } = req.body;
        const userId = req.user.id;

        if (!name || !duration) {
            return res.status(400).send({ message: "Name and duration are required." });
        }

        const newWorkout = await Workout.create({
            userId,
            name,
            duration
        });

        return res.status(201).send(newWorkout);

    } catch (error) {
        return res.status(500).send({ message: "Error adding workout.", error: error.message });
    }
};

// GET /workouts/getMyWorkouts
module.exports.getMyWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({ userId: req.user.id });

        return res.status(200).send({ workouts });

    } catch (error) {
        return res.status(500).send({ message: "Error retrieving workouts.", error: error.message });
    }
};

// PATCH /workouts/updateWorkout/:workoutId
module.exports.updateWorkout = async (req, res) => {
    try {
        const { workoutId } = req.params;
        const { name, duration } = req.body;

        const workout = await Workout.findById(workoutId);

        if (!workout) {
            return res.status(404).send({ message: "Workout not found." });
        }

        if (workout.userId !== req.user.id) {
            return res.status(403).send({ message: "You are not authorized to update this workout." });
        }

        if (name) workout.name = name;
        if (duration) workout.duration = duration;

        const updatedWorkout = await workout.save();

        return res.status(200).send(updatedWorkout);

    } catch (error) {
        return res.status(500).send({ message: "Error updating workout.", error: error.message });
    }
};

// DELETE /workouts/deleteWorkout/:workoutId
module.exports.deleteWorkout = async (req, res) => {
    try {
        const { workoutId } = req.params;

        const workout = await Workout.findById(workoutId);

        if (!workout) {
            return res.status(404).send({ message: "Workout not found." });
        }

        if (workout.userId !== req.user.id) {
            return res.status(403).send({ message: "You are not authorized to delete this workout." });
        }

        await Workout.findByIdAndDelete(workoutId);

        return res.status(200).send({ message: "Workout deleted successfully." });

    } catch (error) {
        return res.status(500).send({ message: "Error deleting workout.", error: error.message });
    }
};

// PATCH /workouts/completeWorkoutStatus/:workoutId
module.exports.completeWorkoutStatus = async (req, res) => {
    try {
        const { workoutId } = req.params;

        const workout = await Workout.findById(workoutId);

        if (!workout) {
            return res.status(404).send({ message: "Workout not found." });
        }

        if (workout.userId !== req.user.id) {
            return res.status(403).send({ message: "You are not authorized to update this workout." });
        }

        workout.status = "completed";
        const updatedWorkout = await workout.save();

        return res.status(200).send(updatedWorkout);

    } catch (error) {
        return res.status(500).send({ message: "Error updating workout status.", error: error.message });
    }
};
