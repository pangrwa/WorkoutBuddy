require('dotenv').config();
const express = require("express");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");

// express app
const app = express();

// middlware 
app.use(express.json()) // parses incoming requests with JSON payloads 

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log("Connected to db & listening on port 4000");
        })
    })
    .catch((error) => {
        console.log(error);
    });
