from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from config import Config
import logging

# Removes "ERROR:root:" from the start of each error log
logging.basicConfig(
    format='%(message)s',
    level=logging.INFO
)

db = SQLAlchemy()
migrate = Migrate()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)

    # Running CORS in prod, as well as local
    CORS(app, resources={
        r"/*": {
            "origins": app.config['FRONTEND_URL'],
            "methods": ["GET", "POST"],
            "allow_headers": ["Content-Type"]
        }
    })

    # Register blueprints
    from app.routes import bp as bp
    app.register_blueprint(bp, url_prefix='/')

    @app.route('/hello', methods=['GET'])
    def api_endpoint():
        return {
            "message": "Hello, World!",
            "status": "success "
        }

    return app

from app import models