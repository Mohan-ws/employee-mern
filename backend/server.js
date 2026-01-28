require("dotenv").config({path: "./.env"});
console.log("Mongo URL:",
  process.env.MONGO_URI);

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Error:", err));

  console.log("MONGO_URL =",
    process.env.MONGO_URI
  );
  
const Employee = require("./Employee");
console.log("server loaded");

const express = require("express");
const cors = require("cors");

const app= express();
app.use(cors());
app.use(express.json());

app.get("/", function(req, res){
    res.send("API running");
});
// Create Employee
app.post("/employees", async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Add
app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({error:
      error.message });
    
  }
});
// Delete Employee
app.delete("/employees/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Update Employee
app.put("/employees/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;

app.listen(PORT, function(){
    console.log("server running on port " + PORT);
});





