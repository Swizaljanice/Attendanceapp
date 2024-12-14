import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [studentData, setStudentData] = useState([]);
  const [studentForm, setStudentForm] = useState({
    name: "",
    rollNo: "",
    course: "",
    semester: "",
    branch: "",
  });

  const [attendance, setAttendance] = useState({});
  const [todayDate] = useState(new Date().toLocaleDateString());

  useEffect(() => {
    // Fetch the student data from the server when the component mounts
    const fetchStudents = async () => {
      const response = await fetch("http://localhost:8080/api/students");
      const data = await response.json();
      setStudentData(data);
    };

    fetchStudents();
  }, []);

  const handleStudentFormChange = (e) => {
    setStudentForm({ ...studentForm, [e.target.name]: e.target.value });
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/api/students/addstudent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentForm),
    });

    if (response.ok) {
      const newStudent = await response.json();
      setStudentData([...studentData, newStudent]);
    }

    setStudentForm({
      name: "",
      rollNo: "",
      course: "",
      semester: "",
      branch: "",
    });
  };

  const markAttendance = async (studentId, status) => {
    const response = await fetch(
      `http://localhost:8080/api/students/${studentId}/attendance`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: todayDate, status }),
      }
    );

    if (response.ok) {
      setAttendance((prevAttendance) => ({
        ...prevAttendance,
        [studentId]: status,
      }));
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome {sessionStorage.getItem("username")}</h1>

      <div className="add-student-form">
        <h2>Add a New Student</h2>
        <form onSubmit={handleStudentSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            onChange={handleStudentFormChange}
            required
            value={studentForm.name}
          />
          <input
            type="text"
            name="rollNo"
            placeholder="Roll No"
            onChange={handleStudentFormChange}
            required
            value={studentForm.rollNo}
          />
          <input
            type="text"
            name="course"
            placeholder="Course"
            onChange={handleStudentFormChange}
            required
            value={studentForm.course}
          />
          <input
            type="text"
            name="semester"
            placeholder="Semester"
            onChange={handleStudentFormChange}
            required
            value={studentForm.semester}
          />
          <input
            type="text"
            name="branch"
            placeholder="Branch"
            onChange={handleStudentFormChange}
            required
            value={studentForm.branch}
          />
          <button type="submit">Add Student</button>
        </form>
      </div>

      <div className="attendance-section">
        <h2>Mark Attendance ({todayDate})</h2>
        <table>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Name</th>
              <th>Roll No</th>
              <th>Course</th>
              <th>Semester</th>
              <th>Branch</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {studentData.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.rollNo}</td>
                <td>{student.course}</td>
                <td>{student.semester}</td>
                <td>{student.branch}</td>
                <td>
                  <button
                    onClick={() => markAttendance(student.id, "Present")}
                  >
                    Present
                  </button>
                  <button
                    onClick={() => markAttendance(student.id, "Absent")}
                  >
                    Absent
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => window.location.href = "/login"}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
