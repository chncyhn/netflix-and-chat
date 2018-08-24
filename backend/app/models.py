from datetime import datetime
from app import db


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    track_id = db.Column(db.BigInteger, index=True)
    name = db.Column(db.String(100))
    date = db.Column(db.DateTime,
                     default=datetime.utcnow)
    text = db.Column(db.String(1000))
