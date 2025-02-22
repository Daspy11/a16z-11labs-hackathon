from flask import jsonify, request
from app.models import Calendar
from app.routes import bp

@bp.route('/calendar', methods=['GET'])
def get_calendar():
    try:
        # Start with base query
        query = Calendar.query

        # Execute query and return results
        calendars = query.all()

        return jsonify([{
            "id": calendar.id,
            "title": calendar.title,
            "start_datetime": calendar.start_datetime.isoformat(),
            "end_datetime": calendar.end_datetime.isoformat(),
            "participant_name": calendar.participant_name,
            "agenda": calendar.agenda,
            "status": calendar.status,
            "created_at": calendar.created_at.isoformat()
        } for calendar in calendars]), 200
    
    except Exception as e:
        return jsonify({
            "message": "Failed to fetch calendars",
            "error": str(e)
        }), 500