def test_listar_empleados_vacio(client):
    res = client.get("/api/empleados/")
    assert res.status_code == 200
    assert res.json == []


def test_crear_empleado(client):
    data = {
        "nombre": "Carlos",
        "departamento": "TI",
        "sueldo": 4500000,
        "correo": "carlos@example.com",
        "contrasena": "1234"
    }
    res = client.post("/api/empleados/", json=data)

    assert res.status_code == 201
    assert res.json["nombre"] == "Carlos"
    assert res.json["correo"] == "carlos@example.com"


def test_obtener_empleado_por_id(client):
    # Crear uno
    client.post("/api/empleados/", json={
        "nombre": "Tatiana",
        "departamento": "Ventas",
        "sueldo": 4200000,
        "correo": "tati@example.com",
        "contrasena": "abc"
    })

    res = client.get("/api/empleados/1")
    assert res.status_code == 200
    assert res.json["nombre"] == "Tatiana"


def test_actualizar_empleado(client):
    # Crear empleado
    client.post("/api/empleados/", json={
        "nombre": "Luis",
        "departamento": "Logística",
        "sueldo": 3800000,
        "correo": "luis@example.com",
        "contrasena": "pass"
    })

    # Actualizar
    res = client.put("/api/empleados/1", json={
        "nombre": "Luis Alberto",
        "sueldo": 3900000
    })

    assert res.status_code == 200
    assert res.json["nombre"] == "Luis Alberto"
    assert float(res.json["sueldo"]) == 3900000


def test_eliminar_empleado(client):
    client.post("/api/empleados/", json={
        "nombre": "Oscar",
        "departamento": "Compras",
        "sueldo": 3100000,
        "correo": "oscar@example.com",
        "contrasena": "zzzz"
    })

    res = client.delete("/api/empleados/1")
    assert res.status_code == 200
    assert res.json["message"] == "Empleado eliminado correctamente"


def test_crear_empleado_correo_duplicado(client):
    data = {
        "nombre": "Jorge",
        "departamento": "TI",
        "sueldo": 5000000,
        "correo": "jorge@example.com",
        "contrasena": "123"
    }

    client.post("/api/empleados/", json=data)
    res = client.post("/api/empleados/", json=data)

    assert res.status_code == 400
    assert "integridad" in res.json["error"].lower()
