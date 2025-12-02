import pytest
import sys
import os

# Obtener ruta absoluta de la carpeta donde está tu código real
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

# Agregar esta carpeta al PYTHONPATH dentro del contenedor
sys.path.insert(0, BASE_DIR)

# Importar desde rh-flask/app/
from app import create_app

@pytest.fixture()
def client():
    app = create_app()
    app.config["TESTING"] = True
    return app.test_client()



    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()
