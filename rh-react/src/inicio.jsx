import React from "react";

export default function Inicio() {
  return (
    <div className="container mt-5">
      {/* Hero Sección */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Bienvenido a Flowlytics</h1>
        <p className="lead mt-3">
          Una plataforma diseñada para optimizar procesos, mejorar la gestión
          empresarial y ofrecer herramientas inteligentes para tus proyectos.
        </p>
      </div>
      {/* Sección de Tarjetas */}
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">¿Quiénes somos?</h5>
              <p className="card-text">
                Somos un equipo que desarrolla soluciones digitales enfocadas en
                la eficiencia, automatización y análisis inteligente de datos.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Nuestra Misión</h5>
              <p className="card-text">
                Crear herramientas tecnológicas accesibles que permitan a
                empresas y personas mejorar sus procesos sin complejidad.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Nuestra Visión</h5>
              <p className="card-text">
                Convertirnos en una plataforma integral que integre
                automatización, analítica y gestión avanzada en un solo
                ecosistema.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Sección final */}
      <div className="text-center mt-5 mb-5">
        <h2 className="fw-bold">¿Por qué usar Flowlytics?</h2>
        <p className="mt-3">
          Seguridad, rapidez, diseño moderno y un ecosistema pensado para crecer
          contigo.
        </p>
      </div>

      <div className="d-flex justify-content-center mt-4 mb-4">
        <div className="card shadow-sm p-4 mt-4 mb-4">
          <h2 className="card-title">Tecnologías utilizadas</h2>
          <ul className="list-unstyled mt-3">
            <li>⚡ React + Bootstrap + Byte para el frontend</li>
            <li>🐍 Flask (Python) para la API REST</li>
            <li>🗄️ MySQL como almacenamiento persistente</li>
            <li>🐋 Docker para contenedores (opcional en despliegue)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
