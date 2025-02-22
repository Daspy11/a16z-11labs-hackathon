from flask import jsonify
from app.routes import bp

@bp.route('/convo/<string:conversation_id>', methods=['GET'])
def get_conversation(conversation_id):
    try:
        print("CONVERSATION ID")
        print(conversation_id)
    except Exception as e:
        return jsonify({
            "message": "Failed to fetch conversation",
            "error": str(e)
        }), 500
