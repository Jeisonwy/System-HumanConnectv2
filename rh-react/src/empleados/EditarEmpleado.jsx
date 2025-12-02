import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const urlBase = "http://127.0.0.1:5000/api/empleados/";

export default function EditarEmpleado() {
  const { id } = useParams(); // obtiene el ID de la URL
  const navigate = useNavigate();

  const [empleado, setEmpleado] = useState({
    nombre: "",
    departamento: "",
    sueldo: "",
    correo: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar datos del empleado actual
    const fetchEmpleado = async () => {
      try {
        const res = await axios.get(`${urlBase}${id}`);
        setEmpleado(res.data);
      } catch (err) {
        console.error("Error cargando empleado:", err);
        alert("No se pudo cargar el empleado");
      } finally {
        setLoading(false);
      }
    };
    fetchEmpleado();
  }, [id]);

  const handleChange = (e) =>
    setEmpleado({ ...empleado, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${urlBase}${id}`, empleado, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Empleado actualizado correctamente");
      navigate("/"); // vuelve al listado
    } catch (err) {
      console.error("Error actualizando:", err);
      alert("Error al actualizar el empleado");
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Editar Empleado</h2>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="row g-2">
          <div className="col-md-3">
            <input
              name="nombre"
              value={empleado.nombre}
              onChange={handleChange}
              className="form-control"
              placeholder="Nombre"
            />
          </div>
          <div className="col-md-3">
            <input
              name="departamento"
              value={empleado.departamento}
              onChange={handleChange}
              className="form-control"
              placeholder="Departamento"
            />
          </div>
          <div className="col-md-2">
            <input
              name="sueldo"
              value={empleado.sueldo}
              onChange={handleChange}
              className="form-control"
              placeholder="Sueldo"
              type="number"
              step="0.01"
            />
          </div>
          <div className="col-md-3">
            <input
              name="correo"
              value={empleado.correo}
              onChange={handleChange}
              className="form-control"
              placeholder="Correo"
              type="email"
            />
          </div>
        </div>

        <div className="mt-3">
          <button className="btn btn-success btn-sm" type="submit">
            Guardar cambios
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm ms-2"
            onClick={() => navigate("/")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
