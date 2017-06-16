# merger/__init__.py

from flask import Flask
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

    
from merger.auth import auth as auth_blueprint
from merger.core import core as core_blueprint


app.register_blueprint(auth_blueprint, url_prefix="/api/auth")
app.register_blueprint(core_blueprint, url_prefix="/api/v1.0")