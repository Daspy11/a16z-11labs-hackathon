from flask import jsonify, request
from app.models import Slack
from app.routes import bp

@bp.route('/slack', methods=['GET'])
def get_slack():
    try:
        # Get optional filter parameters from query string
        status = request.args.get('message_status')

        # Start with base query
        query = Slack.query

        # Apply filters only if parameters are provided
        if status:
            query = query.filter_by(status=status)

        # Execute query and return results
        messages = query.all()

        return jsonify([{
            "id": message.id,
            "source": "slack",
            "project": message.project,
            "message": message.message,
            "sender": message.sender,
            "sent_at": message.sent_at.isoformat(),
            "status": message.status,
            "created_at": message.created_at.isoformat()
        } for message in messages]), 200

    except Exception as e:
        return jsonify({
            "message": "Failed to fetch slack messages",
            "error": str(e)
        }), 500