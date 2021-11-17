const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/apiRoutes");
const PORT = process.env.PORT || 3000;
const app = express();

app.use("/api/workouts", workoutRoutes);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/stats.html'));
});

app.get('/stats', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/stats.html'));
});

app.get('/exercise', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/exercise.html'));
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});