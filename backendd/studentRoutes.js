const express = require("express");     // express → framework for building backend APIs
const router = express.Router();        // router → a mini Express app used to define routes separately
const Student = require("./models/Student");      // represents MongoDB “students” collection

// CREATE
router.post("/", async (req, res) => {      // When frontend sends POST request
    const student = await Student.create(req.body);     // req.body contains student data (name, email, etc.)
    res.json(student); // Saves data in MongoDB
});

// READ
router.get("/", async (req, res) => {   // When frontend sends:
    const students = await Student.find(); //Fetches all students
    res.json(students);     // Sends array of students back
});

// UPDATE
router.put("/:id", async (req, res) => {
    console.log("ID:", req.params.id);
    console.log("BODY:", req.body);

    const updateData = {
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        address: req.body.address
    };

    const student = await Student.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
    );

    console.log(student);

    res.json(student);
});

// DELETE
router.delete("/:id", async (req, res) => {
    const student = await Student.findByIdAndDelete(req.params.id);

    console.log(student);

    res.json({ message: "Deleted" });
});

module.exports = router;


