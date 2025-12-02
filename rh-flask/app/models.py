from extensions import db
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import Numeric

class Empleado(db.Model):
    __tablename__ = "empleados"

    idEmpleado = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(120), nullable=False)
    departamento = db.Column(db.String(100), nullable=False)
    sueldo = db.Column(Numeric(10, 2), nullable=False)
    correo = db.Column(db.String(200), unique=True, nullable=False)
    _contrasena = db.Column("contrasena", db.String(200), nullable=False)

    @property
    def contrasena(self):
        raise AttributeError("La contraseña no puede leerse directamente.")

    @contrasena.setter
    def contrasena(self, raw_password):
        self._contrasena = generate_password_hash(raw_password)

    def check_password(self, raw_password: str) -> bool:
        return check_password_hash(self._contrasena, raw_password)

    def __repr__(self):
        return f"<Empleado {self.idEmpleado} {self.nombre}>"
