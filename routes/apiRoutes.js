const router = require("express").Router();
const Workout = require("../models/workoutModel.js");
const path = require("path");

router.get("/", async (req, res) => {
  try {
    const aggregatedWorkout = await Workout.aggregate([
      {
        $addFields: {
          totalDuration: { $sum: "$excercises.duration" },
        },
      },
    ]);
    // console.log(JSON.stringify(aggregatedWorkout, null));
    res.json(aggregatedWorkout);
  } catch (error) {
    console.log(error);
  }
});

router.get("/range", async (req, res) => {
  try {
    const aggregatedWorkout = await Workout.aggregate([
      {
        $addFields: {
          totalDuration: { $sum: "$excercises.duration" },
        },
      },
    ]);
    console.log(JSON.stringify(aggregatedWorkout, null));
    res.json(aggregatedWorkout);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  const workout = await Workout.create(req.body);
  res.json(workout);
});

router.put("/:id", async (req, res) => {
  console.log("You hit /api/workouts/:id")
  console.log("req.body", req.body)
  try {
    const workout = await Workout.updateOne(
      { _id: req.params.id },
      { $push: { exercises: req.body } }
    );
    console.log(workout)
    res.json(workout);
  } catch (error) {
    console.log("something went wrong")
    console.log(error)
    res.status(400).json(error);
  }
});

module.exports = router;
