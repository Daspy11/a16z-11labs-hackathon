from flask import jsonify, request
from app.models import Email
from app.routes import bp

@bp.route('/email', methods=['GET'])
def get_email():
    try:
        # Get optional filter parameters from query string
        status = request.args.get('status')
        sender = request.args.get('sender')
        subject = request.args.get('subject')

        # Start with base query
        query = Email.query

        # Apply filters only if parameters are provided
        if status:
            query = query.filter_by(status=status)
        if sender:
            query = query.filter_by(sender=sender)
        if subject:
            # Use LIKE with wildcards for fuzzy subject search
            query = query.filter(Email.subject.ilike(f'%{subject}%'))

        # Execute query and return results
        emails = query.all()

        return jsonify([{
            "id": email.id,
            "source": "email",
            "subject": email.subject,
            "body": email.body,
            "sender": email.sender,
            "received_at": email.received_at.isoformat(),
            "status": email.status,
            "created_at": email.created_at.isoformat()
        } for email in emails]), 200

    except Exception as e:
        return jsonify({
            "message": "Failed to fetch emails",
            "error": str(e)
        }), 500