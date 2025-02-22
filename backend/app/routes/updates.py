from app.routes import bp

@bp.route('/updates', methods=['GET'])
def get_updates():
    return {
        "message": "Hello, World!",
        "status": "success "
    }