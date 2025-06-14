from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from frontend

@app.route('/')
def home():
    return jsonify({"message": "Lab Inventory Backend is running!"})

if __name__ == '__main__':
    app.run(debug=True)