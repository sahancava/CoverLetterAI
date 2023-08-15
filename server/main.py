from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from decouple import config
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# MySQL Configuration from .env
app.config['MYSQL_HOST'] = config('MYSQL_HOST')
app.config['MYSQL_USER'] = config('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = config('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = config('MYSQL_DB')

mysql = MySQL(app)

@app.route('/record-upload', methods=['POST'])
def record_upload():
    device_id = request.json['deviceID']
    file_name = request.json['fileName']

    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO coverai.uploads(device_id, file_name) VALUES(%s, %s)", (device_id, file_name))
    mysql.connection.commit()
    upload_id = cur.lastrowid
    cur.close()

    return jsonify({
        'message': 'Upload recorded successfully',
        'uploadID': upload_id
    }), 201

@app.route('/isConnected', methods=['GET'])
def is_connected():
    return jsonify({
        'message': 'Connected successfully'
    }), 200

@app.route('/register', methods=['POST'])
def register():
    device_id = request.json['deviceID']

    cur = mysql.connection.cursor()
    cur.execute("SELECT id, device_id, userType FROM coverai.users WHERE device_id = %s", (device_id,))
    user = cur.fetchone()

    if user:
        return jsonify({
            'message': 'User already registered',
            'userID': user[0],
            'deviceID': user[1],
            'userType': user[2]
        }), 200

    cur.execute("INSERT INTO coverai.users(device_id) VALUES(%s)", (device_id,))
    mysql.connection.commit()
    user_id = cur.lastrowid
    cur.close()

    return jsonify({
        'message': 'User registered successfully',
        'userID': user_id,
        'deviceID': device_id,
        'userType': 'free'
    }), 201

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5001)
