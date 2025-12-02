import React, { useEffect, useState } from "react";
import axios from "axios";
import { NumericFormat } from "react-number-format";
import UserForm from "../UserForm"; // ajusta la ruta si lo guardaste en otro folder
import { useNavigate } from "react-router-dom";

const urlBase = "http://127.0.0.1:5000/api/empleados/";

export default function ListadoEmpleados() {
  const [empleados, setEmpleados] = useState([]);

  // Cargar empleados al montar el componente
  useEffect(() => {
    obtenerEmpleados();
  }, []);

  const obtenerEmpleados = async () => {
    try {
      const respuesta = await axios.get(urlBase);
      setEmpleados(respuesta.data);
    } catch (error) {
      console.error("Error al obtener empleados:", error);
    }
  };

  const handleEliminar = async (idEmpleado) => {
    if (!window.confirm("¿Seguro que deseas eliminar este empleado?")) return;
    try {
      await axios.delete(`${urlBase}${idEmpleado}`); // ajusta endpoint si tu backend espera otra ruta
      obtenerEmpleados();
    } catch (err) {
      console.error("Error eliminando empleado:", err);
      alert("Error al eliminar empleado");
    }
  };

  const navigate = useNavigate();

  const handleEdit = (empleado) => {
    navigate(`/editar/${empleado.idEmpleado}`);
  };

  return (
    <div className="card p-3">
      <div className="d-flex align-items-center mb-3">
        <img width="52" height="52" src="favicon.png" alt="logo flowlytics" />
        <h5 className="mb-3">Formulario de registro</h5>
      </div>

      <UserForm onUserCreated={obtenerEmpleados} />
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Departamento</th>
              <th>Sueldo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.length > 0 ? (
              empleados.map((emp) => (
                <tr key={emp.idEmpleado}>
                  <td>{emp.idEmpleado}</td>
                  <td>{emp.nombre}</td>
                  <td>{emp.departamento}</td>
                  <td>
                    <NumericFormat
                      value={emp.sueldo}
                      displayType={"text"}
                      thousandSeparator=","
                      prefix="$"
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(emp)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleEliminar(emp.idEmpleado)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No hay empleados registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
