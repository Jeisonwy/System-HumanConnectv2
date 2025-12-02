# schemas.py
from app.extensions import ma
from models import Empleado
from marshmallow import fields, validate, post_load, EXCLUDE


class EmpleadoSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Empleado
        load_instance = False  # ✅ cambiamos a False para evitar conflicto con @post_load
        unknown = EXCLUDE

    idEmpleado = ma.auto_field()
    nombre = ma.auto_field(required=True, validate=validate.Length(min=1))
    departamento = ma.auto_field(required=True, validate=validate.Length(min=1))
    sueldo = fields.Decimal(as_string=True, required=True)
    correo = ma.auto_field(required=True, validate=validate.Email())
    contrasena = fields.String(
        load_only=True,
        required=True,
        validate=validate.Length(min=6)
    )

    @post_load
    def make_empleado(self, data, **kwargs):
        from werkzeug.security import generate_password_hash  # 👈 Import local para evitar ciclos
        contrasena = data.pop("contrasena", None)
        emp = Empleado(**data)
        if contrasena:
            emp.contrasena = generate_password_hash(contrasena)
        return emp


# Esquemas individuales y múltiples
empleado_schema = EmpleadoSchema()
empleados_schema = EmpleadoSchema(many=True)
