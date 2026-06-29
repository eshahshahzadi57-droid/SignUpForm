import { useState } from "react";      // React Hook to store data (state)
import StudentForm from "./StudentForm";  // your custom component for adding/updating students

function App() {    // main React component where all logic happens
  const [students, setStudents] = useState([]);   // Stores list of students, Starts as empty array []
  const [editingStudent, setEditingStudent] = useState(null); //Stores student that is being edited, null means no edit mode

  // SEARCH STATE (IMPORTANT FIX)
  const [search, setSearch] = useState("");   //Stores search input value

  // CREATE
  const handleAdd = (student) => {    // Takes new student from form, Adds unique id using Date.now()
    setStudents([...students, { ...student, id: Date.now() }]);   // Adds student to existing array
  };    //👉 ...students means keep old students + add new one

  // DELETE
  const handleDelete = (id) => {  // Remove student whose id matches
    setStudents(students.filter((s) => s.id !== id));   //filter() keeps all except deleted one
  };

  // EDIT
  const handleEdit = (student) => {   // Sends selected student to form
    setEditingStudent(student);
  };

  // UPDATE
  const handleUpdate = (updatedStudent) => {
    setStudents(
      students.map((s) =>           //Loop through all students
        s.id === updatedStudent.id ? updatedStudent : s // Replace matching id student with updated one
      )
    );
    setEditingStudent(null);    // Exit edit mode (null)
  };



  return (
    // main ui container 
    <div className="container">            
      <h1>Student Registration System</h1>    

      <StudentForm  // Sends functions to child component
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        editingStudent={editingStudent}
      />

      {/* 🔍 SEARCH BOX */}
      <input
        type="text"
        placeholder="Search by name..."   // Takes user input
        value={search}      // Updates search state
        onChange={(e) => setSearch(e.target.value)}     // Used for filtering list
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "15px",
          marginBottom: "15px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <h2>Student List</h2>

      {students.filter((s) =>
        (s.name || "").toLowerCase().includes(search.toLowerCase())
        ).length === 0 && (
      <p style={{ textAlign: "center", color: "gray" }}>
        No students found! 
      </p>
)}

      {/* 🔍 FILTER + DISPLAY */}
      {students
        .filter((student) =>
          student.name.toLowerCase().includes(search.toLowerCase()) || 
          (student.email || "").toLowerCase().includes(search.toLowerCase())
        )
        .map((student) => (
          <div key={student.id} className="card">
            <p><b>Name:</b> {student.name}</p>
            <p><b>Email:</b> {student.email}</p>
            <p><b>Number:</b> {student.number}</p>
            <p><b>Address:</b> {student.address}</p>

            <button
              className="edit-btn"
              onClick={() => handleEdit(student)}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => handleDelete(student.id)}
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
}

export default App;