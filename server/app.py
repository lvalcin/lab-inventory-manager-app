from flask import Flask, jsonify, request
from flask_cors import CORS
from routes import api
from models import db, Reagent

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///lab_inventory.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

app.register_blueprint(api, url_prefix='/api')


@app.route('/')
def home():
    return jsonify({"message": "Lab Inventory Backend is running!"})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create database tables if they don't exist
#     app.run(debug=True, host='0.0.0.0')
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050, debug=True)


    