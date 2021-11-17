const router = require("express").Router();
const Workout = require("../models/workoutModel.js");

router.get("/", async (req, res) => {
  try {
    const aggregatedWorkout = await Workout.aggregate([
      {
        $addFields: {
          weeklyDuration: { $sum: "$excercise.duration" },
          weeklyWeight: { $sum: "$excercise.weight" },
        },
      },
    ]);
    console.log(JSON.stringify(aggregatedWorkout, null));
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
          weeklyDuration: { $sum: "$excercise.duration" },
          weeklyWeight: { $sum: "$excercise.weight" },
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
  try {
    const workout = await Workout.updateOne(
      { id: req.params.id },
      { $push: { exercises: req.body } }
    );

    res.json(workout);
  } catch (error) {
    res.status(400).json(err);
  }
});

module.exports = router;
