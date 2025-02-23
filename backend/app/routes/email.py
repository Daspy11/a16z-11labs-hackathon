from flask import jsonify, request
from app.models import Email
from app.routes import bp
from app import db

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

@bp.route('/email', methods=['POST'])
def create_email():
    try:
        data = request.get_json()
        
        # Validate required fields, excluding sender since it has a default
        required_fields = ['subject', 'body']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    "message": f"Missing required field: {field}"
                }), 400

        # Create new email entry with default sender
        new_email = Email(
            subject=data['subject'],
            body=data['body'],
            sender=data.get('sender', 'Leo'),  # Default to 'Leo' if not provided
            status='sent'  # Default status for sent emails
        )
        
        db.session.add(new_email)
        db.session.commit()

        return jsonify({
            "id": new_email.id,
            "source": "email",
            "subject": new_email.subject,
            "body": new_email.body,
            "sender": new_email.sender,
            "received_at": new_email.received_at.isoformat(),
            "status": new_email.status,
            "created_at": new_email.created_at.isoformat()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "message": "Failed to create email",
            "error": str(e)
        }), 500