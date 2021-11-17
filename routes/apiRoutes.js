const router = require("express").Router();
const Workout = require("../models/workoutModel.js");

router.get("/", async (req, res) => {
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

router.post("/", async ({ body }, res) => {
  await Workout.create(body)
    .then((workout) => {
      res.json(workout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/:id", async (req, res) => {
  try {
    const workout = await Workout.updateOne(
      { _id: req.params.id },
      { $push: { exercises: req.body } }
    );

    res.json(workout);
  } catch (error) {
    res.status(400).json(err);
  }
});

module.exports = router;
