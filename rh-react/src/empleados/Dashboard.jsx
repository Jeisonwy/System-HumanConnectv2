import React, { useState, useEffect } from "react";
import axios from "axios";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";
import Icons from "../icons";
import "../styles.css";

const urlBase = "http://127.0.0.1:5000/api/empleados/";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // --- Lógica de Carga (traída de tu archivo ListadoEmpleados) ---
  const obtenerEmpleados = async () => {
    try {
      setLoading(true);
      const respuesta = await axios.get(urlBase);
      setEmployees(respuesta.data);
    } catch (error) {
      console.error("Error al obtener empleados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerEmpleados();
  }, []);

  // --- Lógica de Acciones ---
  const handleEliminar = async (idEmpleado) => {
    if (!window.confirm("¿Seguro que deseas eliminar este empleado?")) return;
    try {
      await axios.delete(`${urlBase}${idEmpleado}`);
      obtenerEmpleados(); // Recargamos la lista después de borrar
    } catch (err) {
      console.error("Error eliminando empleado:", err);
      alert("Error al eliminar empleado");
    }
  };

  const handleEdit = (empleado) => {
    // Asumiendo que tienes una ruta configurada para editar
    navigate(`/editar/${empleado.idEmpleado}`);
  };

  const handleAddEmployee = () => {
    // Redirige a tu formulario de creación o abre el modal
    navigate("/crear"); // O ajusta esta ruta a donde tengas tu UserForm
  };

  // --- Cálculos de Estadísticas ---
  // Como tu API no trae "status", asumimos que todos los de la lista están activos por ahora
  const stats = {
    total: employees.length,
    active: employees.length,
    dbStatus: loading ? "Sincronizando..." : "Conectado",
    lastSync: "Ahora",
  };

  return (
    <div>
      <div className="container-fluid py-4">
        {/* Encabezado */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="h3 mb-0 text-gray-800">Panel General</h2>
            <p className="text-muted small mb-0">
              Gestión de empleados desde base de datos Flask.
            </p>
          </div>
          <button
            className="btn btn-success d-flex align-items-center gap-2 shadow-sm"
            onClick={handleAddEmployee}
          >
            <Icons.UserPlus /> Nuevo Empleado
          </button>
        </div>

        {/* Tarjetas de Estadísticas */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-6 col-xl-3">
            <div className="card border-0 shadow-sm h-100 border-start border-4 border-primary">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-uppercase text-muted small fw-bold mb-1">
                      Total Registros
                    </p>
                    <h3 className="mb-0">{stats.total}</h3>
                  </div>
                  <div className="bg-primary bg-opacity-10 p-3 rounded text-primary">
                    <Icons.Users />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-xl-3">
            <div className="card border-0 shadow-sm h-100 border-start border-4 border-success">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-uppercase text-muted small fw-bold mb-1">
                      Personal Activo
                    </p>
                    <h3 className="mb-0 text-success">{stats.active}</h3>
                  </div>
                  <div className="bg-success bg-opacity-10 p-3 rounded text-success">
                    <Icons.Activity />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-xl-3">
            <div className="card border-0 shadow-sm h-100 border-start border-4 border-info">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-uppercase text-muted small fw-bold mb-1">
                      Estado API
                    </p>
                    <h5 className="mb-0 text-info">{stats.dbStatus}</h5>
                  </div>
                  <div className="bg-info bg-opacity-10 p-3 rounded text-info">
                    <Icons.Database />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-12 col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-blue py-3 d-flex justify-content-between align-items-center">
                <h5 className="m-0 fw-bold text-light">Nómina de Empleados</h5>
                <div className="input-group input-group-sm w-auto">
                  <span className="input-group-text bg-blue border-0">
                    <Icons.Search />
                  </span>
                  <input
                    type="text"
                    className="form-control border-0 bg-dark"
                    placeholder="Buscar..."
                  />
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0 align-middle">
                    <thead className="bg-light">
                      <tr>
                        <th className="ps-4">ID</th>
                        <th>Empleado</th>
                        <th>Departamento</th>
                        <th>Sueldo</th>
                        <th className="text-end pe-4">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="5" className="text-center py-4">
                            Cargando datos...
                          </td>
                        </tr>
                      ) : employees.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center py-4">
                            No hay empleados registrados.
                          </td>
                        </tr>
                      ) : (
                        employees.map((emp) => (
                          <tr key={emp.idEmpleado}>
                            <td className="ps-4 text-muted small">
                              #{emp.idEmpleado}
                            </td>
                            <td className="fw-bold">{emp.nombre}</td>
                            <td>
                              <span className="badge rounded-pill bg-light text-dark border">
                                {emp.departamento}
                              </span>
                            </td>
                            <td className="text-success fw-bold">
                              <NumericFormat
                                value={emp.sueldo}
                                displayType={"text"}
                                thousandSeparator=","
                                prefix="$"
                              />
                            </td>
                            <td className="text-end pe-4">
                              <button
                                className="btn btn-sm btn-outline-primary me-1"
                                onClick={() => handleEdit(emp)}
                              >
                                Editar
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleEliminar(emp.idEmpleado)}
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Panel Lateral de Servidor */}
          <div className="col-12 col-lg-4">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-header bg-blue py-3">
                <h6 className="m-0 fw-bold text-light">
                  Monitor de Base de Datos
                </h6>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <small className="text-muted d-block">
                    Endpoint Conectado
                  </small>
                  <a href={urlBase}>
                    <code className="no-underline">{urlBase}</code>
                  </a>
                </div>
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="small fw-bold">Registros Cargados</span>
                    <span className="small text-muted">
                      {employees.length} ítems
                    </span>
                  </div>
                  <div className="progress" style={{ height: "6px" }}>
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
