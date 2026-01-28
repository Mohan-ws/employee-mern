import { useEffect, useState } from "react";
import Layout from "../components/Layout";

function ViewEmployees() {

  // ✅ STATES
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // ✅ Fetch Employees
  const fetchEmployees = async () => {
    const res = await fetch("http://localhost:5000/employees");
    const data = await res.json();
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // ✅ Edit Button Click
  const handleEdit = (emp) => {
    setEditingEmployee(emp);
  };

  // ✅ Update Employee
  const handleUpdate = async () => {
    console.log("Updating employee:", editingEmployee)
    await fetch(`http://localhost:5000/employees/${editingEmployee._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingEmployee),
    });

    setEditingEmployee(null);
    fetchEmployees();
  };

  // ✅ Delete Employee
  const deleteEmployee = async (id) => {
    await fetch(`http://localhost:5000/employees/${id}`, {
      method: "DELETE",
    });

    fetchEmployees();
  };

  return (
    <Layout>
    <div className="container">

      {/* ✅ EDIT FORM */}
      {editingEmployee && (
        <div className="edit-box">
          <h3>Edit Employee</h3>

          <input
            value={editingEmployee.name}
            onChange={(e) =>
              setEditingEmployee({ ...editingEmployee, name: e.target.value })
            }
          />

          <input
            value={editingEmployee.role}
            onChange={(e) =>
              setEditingEmployee({ ...editingEmployee, role: e.target.value })
            }
          />

          <input
            value={editingEmployee.salary}
            onChange={(e) =>
              setEditingEmployee({ ...editingEmployee, salary: e.target.value })
            }
          />

          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditingEmployee(null)}>Cancel</button>
        </div>
      )}

      {/* 👇 EMPLOYEE LIST */}
      <h2>Employee List</h2>

      {employees.map((emp) => (
        <div key={emp._id} className="employee-item">
         <div className="employee-text">
         <strong>{emp.name}</strong> — {emp.role} — ₹{emp.salary}
        </div>

          <button onClick={() => handleEdit(emp)}>Edit</button>
          <button onClick={() => deleteEmployee(emp._id)}>Delete</button>
        </div>
      ))}

    </div>
    </Layout>
  );
}

export default ViewEmployees;