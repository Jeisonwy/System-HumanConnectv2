import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListadoEmpleados from "./empleados/ListadoEmpleados";
import EditarEmpleado from "./empleados/EditarEmpleado";
import Navbar from "./empleados/Navbar";
import Dashboard from "./empleados/Dashboard";
import UserForm from "./UserForm";
import HomePage from "./inicio";
export default function App() {
  return (
    <Router>
      <>
        <Navbar />
        <div className="container mt-4"></div>
      </>
      <div className="container py-4">
        <Routes>
          <Route path="/ListadoEmpleados" element={<ListadoEmpleados />} />
          <Route path="/editar/:id" element={<EditarEmpleado />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/crear" element={<UserForm />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}
