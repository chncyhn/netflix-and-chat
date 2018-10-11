from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_caching import Cache

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
cache = Cache(app, config={'CACHE_TYPE': 'simple'})

from app import routes, models
