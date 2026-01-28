import Layout from "../components/Layout";
import { useState } from "react";

function AddEmployee() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");

  const addEmployee = async (e) => {
    e.preventDefault();

    const newEmployee = { name, email, role, salary };

    await fetch("http://localhost:5000/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
    });

    alert("Employee Added ✅");

    setName("");
    setEmail("");
    setRole("");
    setSalary("");
  };

  return (
    <Layout>
    <div className="page-bg">
      <div className="container">
        <h2>Add Employee</h2>

        <form className="form" onSubmit={addEmployee}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <input
            placeholder="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />

          <button type="submit">Add Employee</button>
        </form>
      </div>
    </div>
    </Layout>
  );
}

export default AddEmployee;