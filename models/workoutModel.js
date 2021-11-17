const mongoose = require("mongoose");

const { Schema } = mongoose;

const workoutSchema = new Schema({
  day: {
    type: Date,
    required: true,
    default: Date.now,
  },
  excercises: [
    {
      type: {
        type: String,
        trim: true,
        required: true,
        enum: ["cardio", "resistance"],
      },
      name: {
        type: String,
        trim: true,
       // required: "The name of the excercise",
      },
      duration: {
        type: Number,
        // required: "The duration of the excercise",
      },
      weight: {
        type: Number,
       // required: "The weight of the excercise",
      },
      reps: {
        type: Number,
       // required: "The amount of reps performed",
      },
      sets: {
        type: Number,
       // required: "The amount of sets performed",
      },
    },
  ],
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
