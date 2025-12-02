// src/components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <a
        className="navbar-brand"
        href="/"
        style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
      >
        <img
          src="favicon.png"
          width="40"
          height="40"
          alt="logo flowlytics"
          style={{ display: "block" }}
        />
        <span className="mb-0 fs-5 fw-bold">Flowlytics</span>
      </a>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link" onClick={() => navigate("/")}>
              Inicio
            </a>
          </li>

          <li className="nav-item">
            <a
              className="nav-link"
              onClick={() => navigate("/ListadoEmpleados")}
            >
              Registro usuarios
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" onClick={handleDashboard}>
              Dashboard general
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
