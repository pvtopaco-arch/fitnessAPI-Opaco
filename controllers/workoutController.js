const Workout = require("../models/Workout");


// ADD WORKOUT
const addWorkout = async (req, res) => {

    try {

        const { name, duration } = req.body;

        if (!name || !duration) {
            return res.status(400).send({
                message: "Name and duration are required"
            });
        }

        const newWorkout = new Workout({
            name: name,
            duration: duration,
            userId: req.user.id
        });

        const savedWorkout = await newWorkout.save();

        return res.status(201).send(savedWorkout);

    } catch (error) {

        console.error(error);

        return res.status(500).send({
            message: "Internal Server Error"
        });
    }
};



const getMyWorkouts = async (req, res) => {
    try {

        console.log("REQ.USER:", req.user);

        const workouts = await Workout.find({
            userId: req.user.id
        });

        console.log("WORKOUTS:", workouts);

        return res.status(200).send({
            workouts: workouts
        });

    } catch (error) {

        console.error("GET MY WORKOUTS ERROR:", error);

        return res.status(500).send({
            message: "Internal Server Error"
        });
    }
};

// UPDATE WORKOUT
const updateWorkout = async (req, res) => {

    try {

        const { workoutId, name, duration } = req.body;

        const workout = await Workout.findOne({
            _id: workoutId,
            userId: req.user.id
        });

        if (!workout) {
            return res.status(404).send({
                message: "Workout not found"
            });
        }

        if (name !== undefined) {
            workout.name = name;
        }

        if (duration !== undefined) {
            workout.duration = duration;
        }

        const updatedWorkout = await workout.save();

        return res.status(200).send(updatedWorkout);

    } catch (error) {

        console.error(error);

        return res.status(500).send({
            message: "Internal Server Error"
        });
    }
};


// DELETE WORKOUT
const deleteWorkout = async (req, res) => {

    try {

        const { workoutId } = req.body;

        const workout = await Workout.findOneAndDelete({
            _id: workoutId,
            userId: req.user.id
        });

        if (!workout) {
            return res.status(404).send({
                message: "Workout not found"
            });
        }

        return res.status(200).send({
            message: "Workout deleted successfully"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).send({
            message: "Internal Server Error"
        });
    }
};


// COMPLETE WORKOUT
const completeWorkoutStatus = async (req, res) => {

    try {

        const { workoutId } = req.body;

        const workout = await Workout.findOne({
            _id: workoutId,
            userId: req.user.id
        });

        if (!workout) {
            return res.status(404).send({
                message: "Workout not found"
            });
        }

        workout.status = "completed";

        const updatedWorkout = await workout.save();

        return res.status(200).send(updatedWorkout);

    } catch (error) {

        console.error(error);

        return res.status(500).send({
            message: "Internal Server Error"
        });
    }
};


module.exports = {
    addWorkout,
    getMyWorkouts,
    updateWorkout,
    deleteWorkout,
    completeWorkoutStatus
};