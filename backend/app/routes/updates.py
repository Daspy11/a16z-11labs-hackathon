import logging
from app.routes import bp
from flask import request

# Configure logging
logging.basicConfig(level=logging.INFO)

@bp.route('/updates', methods=['GET'])
def get_updates():
    # Log the request URL
    logging.info("Request URL: %s", request.url)

    message_status = request.args.get('message_status')
    message_source = request.args.get('message_source')

    messages = [
        {
            "source": "slack",
            "project": "engineering-incidents", 
            "message": "Incident Reported – Authentication Service Down",
            "sender": "System",
            "date": "Monday – 10:05 AM",
            "status": "read"
        },
        {
            "source": "slack",
            "project": "engineering-incidents",
            "message": "Getting reports that users can't log in. Checking logs now.",
            "sender": "Mark", 
            "date": "Monday – 10:05 AM",
            "status": "read"
        },
        {
            "source": "slack",
            "project": "engineering-incidents",
            "message": "Seeing a spike in 500s from the auth service. Looks like a DB connection issue?",
            "sender": "Charlie",
            "date": "Monday – 10:05 AM", 
            "status": "read"
        },
        {
            "source": "slack",
            "project": "engineering-incidents",
            "message": "Monitoring dashboards—requests are piling up, latency is through the roof. Something is definitely off.",
            "sender": "Priya",
            "date": "Monday – 10:05 AM",
            "status": "read"
        },
        {
            "source": "slack", 
            "project": "engineering-incidents",
            "message": "Customer Support is blowing up—users locked out across all regions. Do we have an ETA?",
            "sender": "Samantha",
            "date": "Monday – 10:05 AM",
            "status": "read"
        },
        {
            "source": "slack",
            "project": "engineering-incidents",
            "message": "Rolling back the latest auth-service deployment. Might be related.",
            "sender": "Mark",
            "date": "Monday – 10:05 AM",
            "status": "read"
        },
        {
            "source": "slack",
            "project": "engineering-incidents",
            "message": "Rollback didn't fix it. Issue persists.",
            "sender": "Charlie",
            "date": "Monday – 10:30 AM",
            "status": "read"
        },
        {
            "source": "slack",
            "project": "engineering-incidents",
            "message": "Confirming—DB connections are maxed out, seeing timeouts in the pool.",
            "sender": "Priya",
            "date": "Monday – 10:30 AM",
            "status": "read"
        },
        {
            "source": "slack",
            "project": "engineering-incidents",
            "message": "Could this be related to last week's infra changes? We updated how auth-service handles connection retries.",
            "sender": "Mark",
            "date": "Monday – 10:30 AM",
            "status": "read"
        },
        {
            "source": "slack",
            "project": "engineering-incidents",
            "message": "Just got a message from the VP—this is impacting a key client. We need updates every 30 mins.",
            "sender": "Samantha",
            "date": "Monday – 10:30 AM",
            "status": "read"
        },
        {
            "source": "slack",
            "project": "engineering-incidents",
            "message": "Narrowed it down—seems like a new rate-limit check is failing and blocking auth requests. Investigating fix.",
            "sender": "Charlie",
            "date": "Monday – 11:15 AM",
            "status": "read"
        },
        {
            "source": "slack",
            "project": "engineering-incidents",
            "message": "We can manually clear blocked requests, but that's not a real fix. Need a patch.",
            "sender": "Mark",
            "date": "Monday – 11:15 AM",
            "status": "read"
        },
        {
            "source": "slack",
            "project": "engineering-incidents",
            "message": "Temp fix deployed—extended connection timeout as a stopgap. Users still seeing issues, though.",
            "sender": "Priya",
            "date": "Monday – 11:15 AM",
            "status": "read"
        },
        {
            "source": "slack",
            "project": "engineering-incidents",
            "message": "Pushed a hotfix—disabled the faulty rate-limit check. Seeing normal auth traffic now. Can someone confirm?",
            "sender": "Charlie",
            "date": "Monday – 12:45 PM",
            "status": "read"
        },
        {
            "source": "slack",
            "project": "engineering-incidents",
            "message": "Metrics are stabilizing. Logins are back up. Looks good so far.",
            "sender": "Priya",
            "date": "Monday – 12:45 PM",
            "status": "read"
        },
        {
            "source": "slack",
            "project": "engineering-incidents",
            "message": "Customer Support confirms logins are working for most users. Still waiting on final confirmation from some clients.",
            "sender": "Samantha",
            "date": "Monday – 12:45 PM",
            "status": "unread"
        },
        {
            "source": "slack",
            "project": "engineering-incidents",
            "message": "Declaring the incident resolved. Postmortem scheduled for Wednesday. Thanks, everyone!",
            "sender": "Priya",
            "date": "Monday – 3:30 PM",
            "status": "unread"
        }
    ]

    # Filter messages based on query parameters
    if message_status:
        messages = [msg for msg in messages if msg['status'] == message_status]
    if message_source:
        messages = [msg for msg in messages if msg['source'] == message_source]

    # Count the number of messages after filtering
    message_count = len(messages)

    return {
        "messages": messages,
        "message_count": message_count,
        "status": "success"
    }