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
       required: true,
       minLength: 1,
       maxLength: 50,
      },
      duration: {
        type: Number,
        required: true,
        default: 0,
      },
      weight: {
        type: Number,
      },
      reps: {
        type: Number,
      },
      sets: {
        type: Number,
      },
      distance: {
        type: Number,
      },
    },
  ],
});



const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
