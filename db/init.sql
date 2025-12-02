CREATE DATABASE IF NOT EXISTS empleados_db;
USE empleados_db;
CREATE TABLE IF NOT EXISTS empleados (
    idEmpleado INT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    departamento VARCHAR(100) NOT NULL,
    sueldo DECIMAL(10,2) NOT NULL,
    correo VARCHAR(120) UNIQUE NOT NULL,
    contrasena VARCHAR(250) NOT NULL
);
