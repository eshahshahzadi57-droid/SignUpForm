import { useState, useEffect } from "react";        //IMPORTS--> useState-stores form data 2) useEffect-runs code when something changes (here: edit mode)


// Compnents+Props
function StudentForm({ onAdd, onUpdate, editingStudent }) { // This form receives 3 things from parent (App):
    const [student, setStudent] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
    });

  // Fill form when editing
    useEffect(() => {           // This stores what user types in form fields.  👉 Initially all fields are empty.
    if (editingStudent) {
        setStudent({
        name: editingStudent.name || "",
        email: editingStudent.email || "",
        number: editingStudent.number || "",
        address: editingStudent.address || "",
        });
    }
    }, [editingStudent]);       // 👉 “When editingStudent changes, form auto-fills with existing data”

    const handleChange = (e) => {
    setStudent({
        ...student,
        [e.target.name]: e.target.value,
    });
    };

    const handleSubmit = (e) => {
    e.preventDefault();     // Stops page reload

    if (editingStudent) {
        onUpdate({ ...student, id: editingStudent.id });
    } else {
        onAdd(student);
    }

    setStudent({
        name: "",
        email: "",
        number: "",
        address: "",
    });
    };

    return (
    <form onSubmit={handleSubmit}>
        <h2>{editingStudent ? "Update Student" : "Add Student"}</h2>

        <input name="name" placeholder="Name" value={student.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={student.email} onChange={handleChange} />
        <input name="number" placeholder="Number" value={student.number} onChange={handleChange} />
        <input name="address" placeholder="Address" value={student.address} onChange={handleChange} />

        <button type="submit">
        {editingStudent ? "Update" : "Add"}
        </button>
    </form>
    );
}

export default StudentForm;