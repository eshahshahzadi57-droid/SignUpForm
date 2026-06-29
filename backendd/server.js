const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());    // Converts incoming JSON data into JavaScript objects.

mongoose
    .connect(process.env.MONGO_URI) //Establishes connection between Node.js and MongoDB.
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

app.use("/students", require("./studentRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {            // starts the Express server and listens for incoming requests on the specified port.
    console.log(`Server running on port ${PORT}`);
});
