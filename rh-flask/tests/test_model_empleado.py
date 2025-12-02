from models import Empleado
from extensions import db

def test_empleado_creacion(db_session):
    empleado = Empleado(
        nombre="Juan",
        departamento="TI",
        sueldo=3000000,
        correo="juan@example.com"
    )
    empleado.contrasena = "12345"

    db.session.add(empleado)
    db.session.commit()

    assert empleado.idEmpleado is not None
    assert empleado.check_password("12345") is True
    assert empleado.check_password("wrong") is False


def test_empleado_contrasena_no_lectura():
    empleado = Empleado(
        nombre="Ana",
        departamento="RH",
        sueldo=2500000,
        correo="ana@example.com"
    )
    empleado.contrasena = "secreto"

    try:
        _ = empleado.contrasena
        assert False, "La contraseña debería lanzar excepción al leerse"
    except AttributeError:
        assert True
