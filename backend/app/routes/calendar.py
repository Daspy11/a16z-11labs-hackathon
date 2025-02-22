from flask import jsonify, request
from app.models import Calendar
from app.routes import bp
from datetime import datetime, timedelta

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

@bp.route('/availability', methods=['GET'])
def get_availability():
    try:
        # Get parameters from URL
        date = request.args.get('date')
        duration_minutes = request.args.get('duration_minutes', type=int)
        users = request.args.getlist('users')  # Handles multiple user parameters

        # Validate required inputs
        missing_params = []
        if not date:
            missing_params.append("date")
        if not duration_minutes:
            missing_params.append("duration_minutes")
        if not users:
            missing_params.append("users")
            
        if missing_params:
            return jsonify({
                "message": f"Missing required parameters: {', '.join(missing_params)}"
            }), 400

        # Parse inputs
        try:
            target_date = datetime.fromisoformat(date)
            duration = timedelta(minutes=duration_minutes)
        except ValueError:
            return jsonify({
                "message": "Invalid date format. Please use ISO format (YYYY-MM-DD)"
            }), 400

        # Get all calendar events for the specified users on the target date
        start_of_day = target_date.replace(hour=0, minute=0, second=0, microsecond=0)
        end_of_day = start_of_day + timedelta(days=1)
        
        meetings = Calendar.query.filter(
            Calendar.participant_name.in_(users),
            Calendar.start_datetime >= start_of_day,
            Calendar.end_datetime <= end_of_day,
            Calendar.status != 'cancelled'
        ).order_by(Calendar.start_datetime).all()

        # Define business hours (9 AM to 5 PM)
        business_start = start_of_day.replace(hour=9)
        business_end = start_of_day.replace(hour=18)

        # Find available slots
        available_slots = []
        current_time = business_start

        while current_time + duration <= business_end:
            is_slot_available = True
            
            for meeting in meetings:
                # Check if current slot overlaps with any meeting
                if (current_time < meeting.end_datetime and 
                    current_time + duration > meeting.start_datetime):
                    is_slot_available = False
                    # Jump to end of this meeting
                    current_time = meeting.end_datetime
                    break
            
            if is_slot_available:
                available_slots.append({
                    "start_time": current_time.isoformat(),
                    "end_time": (current_time + duration).isoformat()
                })
                current_time += timedelta(minutes=30)  # 30-minute increments
            else:
                # If we didn't jump to a meeting end, move forward in 30-min increments
                if current_time == business_start:
                    current_time += timedelta(minutes=30)

        if not available_slots:
            return jsonify({
                "message": "No common availability found for the specified users and duration"
            }), 404

        return jsonify({
            "available_slots": available_slots
        }), 200

    except Exception as e:
        return jsonify({
            "message": "Failed to fetch availability",
            "error": str(e)
        }), 500