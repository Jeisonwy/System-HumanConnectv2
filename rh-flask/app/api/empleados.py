# api/empleados.py
from flask import Blueprint, jsonify, request
from app.extensions import db
from app.models import Empleado
from app.schemas import empleado_schema, empleados_schema
from sqlalchemy.exc import IntegrityError

# Definimos el blueprint con prefijo '/api/empleados'
empleados_bp = Blueprint('empleados_bp', __name__, url_prefix='/api/empleados')

# ---------------------------
# Listar empleados
# ---------------------------
@empleados_bp.route('/', methods=['GET'])
def listar_empleados():
    empleados = Empleado.query.all()
    return jsonify(empleados_schema.dump(empleados)), 200

# ---------------------------
# Obtener empleado por ID
# ---------------------------
@empleados_bp.route('/<int:id>', methods=['GET'])
def obtener_empleado(id):
    empleado = Empleado.query.get_or_404(id)
    return jsonify(empleado_schema.dump(empleado)), 200

# ---------------------------
# Crear nuevo empleado
# ---------------------------
@empleados_bp.route('/', methods=['POST'])
def crear_empleado():
    try:
        data = request.get_json()
        nuevo_empleado = empleado_schema.load(data)  # aquí se ejecuta make_empleado automáticamente
        db.session.add(nuevo_empleado)
        db.session.commit()
        return jsonify(empleado_schema.dump(nuevo_empleado)), 201
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({"error": "Error de integridad. Verifica campos únicos o relaciones."}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# ---------------------------
# Actualizar empleado
# ---------------------------
@empleados_bp.route('/<int:id>', methods=['PUT'])
def actualizar_empleado(id):
    empleado = Empleado.query.get_or_404(id)
    data = request.get_json()

    # Cargamos datos parcialmente (sin contraseña)
    empleado.nombre = data.get('nombre', empleado.nombre)
    empleado.departamento = data.get('departamento', empleado.departamento)
    empleado.sueldo = data.get('sueldo', empleado.sueldo)
    empleado.correo = data.get('correo', empleado.correo)

    db.session.commit()
    return jsonify(empleado_schema.dump(empleado)), 200

# ---------------------------
# Eliminar empleado
# ---------------------------
@empleados_bp.route('/<int:id>', methods=['DELETE'])
def eliminar_empleado(id):
    empleado = Empleado.query.get_or_404(id)
    db.session.delete(empleado)
    db.session.commit()
    return jsonify({'message': 'Empleado eliminado correctamente'}), 200
