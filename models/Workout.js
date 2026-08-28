const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    duration: {
        type: String,
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    dateAdded: {
        type: Date,
        default: Date.now
    },

    status: {
        type: String,
        default: "pending"
    }
});

module.exports = mongoose.model("Workout", workoutSchema);