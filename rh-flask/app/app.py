# app.py
import os
from flask import Flask
from .extensions import db, migrate, ma, cors
from .api.empleados import empleados_bp

def create_app():
    app = Flask(__name__)

    # Detectar entorno (Docker o local)
    is_docker = os.path.exists("/.dockerenv")

    if is_docker:
        # Si está corriendo dentro de Docker
        db_uri = "mysql+pymysql://root:admin@db:3306/empleados_db"
    else:
        # Si está corriendo en tu máquina local
        db_uri = "mysql+pymysql://root:admin@localhost:3306/empleados_db"

    # Permitir sobreescribir con variable de entorno si se define
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", db_uri)
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JSON_SORT_KEYS"] = False

    # Inicializar extensiones
    db.init_app(app)
    migrate.init_app(app, db)
    ma.init_app(app)
    cors.init_app(app, resources={r"/api/*": {"origins": "*"}})

    # Registrar blueprint
    app.register_blueprint(empleados_bp)

    @app.route("/")
    def index():
        return {"message": "API Empleados activa. Endpoint base: /api/empleados"}, 200

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000)
