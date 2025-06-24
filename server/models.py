from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

db = SQLAlchemy()

class Reagent(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(25), unique=True, nullable=False)
    lot_number: Mapped[str]=mapped_column(String(25), unique=False, nullable=False)
    exp_date: Mapped[str]=mapped_column(String(25), unique=False, nullable=False)
    quantity: Mapped[int]=mapped_column(nullable=False, unique=False)
    # min_amount:Mapped[int]=mapped_column(nullable=False, unique=False)

    def serialize(self):
        return{
            "id": self.id,
            "name": self.name,
            "lot_number": self.lot_number,
            "exp_date": self.exp_date,
            "quantity": self.quantity,
            # "min_amount": self.min_amount
        }
