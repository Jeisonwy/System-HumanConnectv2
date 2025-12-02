from flask import Flask
from extensions import db, migrate, ma, cors
from .api.empleados import empleados_bp
from .models import Empleado
from .app import create_app

def create_app(config_object=None):
    app = Flask(__name__)

    # Configuración básica (usa SQLite por defecto)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    if config_object:
        app.config.from_object(config_object)

    # Inicializar extensiones
    db.init_app(app)
    ma.init_app(app)

    # Registrar blueprints
    app.register_blueprint(empleados_bp)

    # Crear tablas
    with app.app_context():
        db.create_all()

    return app
