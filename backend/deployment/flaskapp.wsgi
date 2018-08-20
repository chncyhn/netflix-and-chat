#!/usr/bin/python
import sys
import logging
import os

logging.basicConfig(stream=sys.stderr)
sys.path.insert(0, "/var/www/FlaskApp/")

from app import app as application
application.secret_key = app.config.get('SECRET_KEY')
