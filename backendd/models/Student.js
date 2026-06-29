const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({  // A schema defines what fields a document can have and their data types.
    name: String,
    email: String,
    number: String,
    address: String,
});     // To define the structure of student documents stored in MongoDB.

module.exports = mongoose.model("Student", studentSchema); // A model - perform CRUD operations on the Student collection