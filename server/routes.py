from flask import Blueprint, request, jsonify
from models import db, Reagent
from flask_cors import CORS

api = Blueprint('api', __name__)
CORS(api)# Allow requests from frontend

# //code below is the route post method for adding a new reagent
@api.route("/reagent", methods=["POST"])
def add_reagent():
    data = request.json
    print("DATA RECEIVED!!!", data)  # This should print in terminal, this is the data rcvd form the frontend

    if not data:
        return jsonify({"error": "No data received"}), 400

    new_reagent = Reagent(
        name = data["name"],
        lot_number = data["lot_number"],
        exp_date = data["exp_date"],
        quantity =  data["quantity"],
        # min_amount = data["min_amount"]
    )
    db.session.add(new_reagent)
    db.session.commit()
    return jsonify (new_reagent.serialize()), 200

#code below is the route get method for getting all reagents
@api.route("/reagent", methods=["GET"])
def get_reagent():
    reagent = Reagent.query.all()
    serialized_reagents = [r.serialize() for r in reagent]  # Convert each to dictionary
    return jsonify(serialized_reagents), 200
# @app.route('/api/reagent', methods=['GET'])
# def get_reagents():
#     reagents = Reagent.query.all()
#     return jsonify([r.serialize() for r in reagents])



#code below is the route PUT method editing reagents
@api.route("/reagent/<int:id>", methods=["PUT"])
def update_reagent():
    reagent = Reagent.query.get(id)

#code below is the route DELETE method to delete reagents
@api.route("/reagent/<id>", methods=["DELETE"])
def delete_reagent(id):
    reagent = Reagent.query.get(id)
    if not reagent:
        return jsonify({"error": "Reagent not found"}), 404
    db.session.delete(reagent)
    db.session.commit()
    return jsonify({"message": "Reagent deleted successfully"}), 200

# if __name__ == '__main__':
#     app.run(debug=True)