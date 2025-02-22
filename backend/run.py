from app import create_app

app = create_app()

if __name__ == '__main__':
    # Settings for Flask dev server
    # Prod uses Gunicorn, which has its own configuration
    app.run(
        host=app.config['FLASK_HOST'],
        debug=app.config['FLASK_DEBUG'],
        port=app.config['FLASK_PORT']
    )