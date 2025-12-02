# prueba_conexion.py (temporal)
import pymysql
conn = pymysql.connect(host="localhost", user="root", password="admin", database="empleados_db")
print("Conectado OK")
conn.close()
