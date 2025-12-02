import React, { useState } from "react";
import axios from "axios";

const urlBase = "http://127.0.0.1:5000/api/empleados/";

export default function UserForm({ onUserCreated }) {
  const [formData, setFormData] = useState({
    idEmpleado: "",
    nombre: "",
    departamento: "",
    sueldo: "",
    correo: "",
    contrasena: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.correo || !formData.contrasena) {
      alert("Nombre, correo y contraseña son obligatorios");
      return;
    }

    try {
      setLoading(true);
      await axios.post(urlBase, formData, {
        headers: { "Content-Type": "application/json" },
      });

      setFormData({
        idEmpleado: "",
        nombre: "",
        departamento: "",
        sueldo: "",
        correo: "",
        contrasena: "",
      });

      if (onUserCreated) onUserCreated();
      alert("Empleado creado correctamente");
    } catch (err) {
      console.error("Error creando empleado:", err);
      alert("Ocurrió un error al crear el empleado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mb-3" onSubmit={handleSubmit}>
      {/* Fila 1: Campos */}
      <div className="row g-2">
        <div className="col-md-2">
          <input
            name="idEmpleado"
            value={formData.idEmpleado}
            onChange={handleChange}
            className="form-control"
            placeholder="ID"
          />
        </div>
        <div className="col-md-3">
          <input
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="form-control"
            placeholder="Nombre"
            required
          />
        </div>
        <div className="col-md-3">
          <input
            name="departamento"
            value={formData.departamento}
            onChange={handleChange}
            className="form-control"
            placeholder="Departamento"
          />
        </div>
        <div className="col-md-2">
          <input
            name="sueldo"
            value={formData.sueldo}
            onChange={handleChange}
            className="form-control"
            placeholder="Sueldo"
            type="number"
            step="0.01"
          />
        </div>
        <div className="col-md-2">
          <input
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            className="form-control"
            placeholder="Correo"
            type="email"
          />
        </div>

        <div className="col-md-3 mt-2">
          <input
            name="contrasena"
            value={formData.contrasena}
            onChange={(e) => {
              handleChange(e); // esto mantiene formData
            }}
            className="form-control"
            placeholder="Contraseña"
            type="password"
          />

          {/* Mensaje de error */}
          {formData.contrasena.length > 0 && formData.contrasena.length < 6 && (
            <p className="text-danger mt-1" style={{ fontSize: "0.9rem" }}>
              La contraseña debe tener mínimo 6 caracteres.
            </p>
          )}
        </div>
      </div>

      {/* Fila 2: Botón */}
      <div className="row mt-3">
        <div className="col-auto">
          <button
            className="btn btn-primary btn-sm"
            type="submit"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Agregar empleado"}
          </button>
        </div>
      </div>
    </form>
  );
}
