from flask import Flask, Blueprint, request, jsonify
from models import db, Reagent
from flask_cors import CORS

api = Blueprint("api", __name__)
CORS(api)

# //code below is the route post method for adding a new reagent
@api.route("/reagent", methods=["POST"])
def add_reagent():
    data = request.json
    new_reagent = Reagent(
        name = data["name"],
        lot_number = data["lot_number"],
        exp_date = data["exp_date"],
        quantity =  data["quantity"],
        min_amount = data["min_amount"]
    )
    db.session.add(new_reagent)
    db.session.commit()
    return jsonify (new_reagent.serialize()), 200

#codde below is the route get method for getting all reagents
@api.route("/reagent", methods=["GET"])
def get_reagent():
    reagent = reagent.query.all()


            #

        