# merger/__init__.py

from flask import Flask, jsonify, make_response
from flask.ext.bcrypt import Bcrypt
from flask.ext.sqlalchemy import SQLAlchemy
from merger.config import BaseConfig


# config

app = Flask(__name__)
app.config.from_object(BaseConfig)

bcrypt = Bcrypt(app)
db = SQLAlchemy(app)

@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.errorhandler(400)
def bad_req(eror):
    return make_response(jsonify({"error": "Bad Request"}), 400)

@app.errorhandler(405)
def bad_req(eror):
    return make_response(jsonify({"error": "Method Not Allowed"}), 405)

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({"error" : "Resource not found"}), 404)

@app.errorhandler(500)
def internal_error(error):
    return make_response(jsonify({"error" : "Internal Error"}), 500)
    

from merger.auth import auth as auth_blueprint
from merger.core import core as core_blueprint


app.register_blueprint(auth_blueprint, url_prefix="/api/auth")
app.register_blueprint(core_blueprint, url_prefix="/api/v1.0")