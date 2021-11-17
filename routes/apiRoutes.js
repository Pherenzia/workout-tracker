const router = require("express").Router();
const Workout = require("../models/workoutModel.js");

router.get("/", async (req, res) => {
  try {
    const aggregatedWorkout = await db.Workout.aggregate([
      {
        $addFields: {
          weeklyDuration: { $sum: "$excercise.duration" },
          weeklyWeight: { $sum: "$excercise.weight" },
        },
      },
    ]);
    console.log(JSON.stringify(aggregatedWorkout, null, 7));
    res.json(aggregatedWorkout);
  } catch (error) {
    console.log(error);
  } finally {
    process.exit();
  }
});

router.get("/range", async (req, res) => {
  const workout = await Workout.find();
  res.json(workout);
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
