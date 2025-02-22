import os
import shutil
from app import create_app, db
from app.models import Slack
from datetime import datetime

def reset_database(app):
    with app.app_context():
        # Delete Postgres tables, delete local SQLite database completely
        db.drop_all()

        for dir in ['instance', 'migrations']:
            if os.path.exists(dir):
                shutil.rmtree(dir)
            
        # Create tables in current database (Postgres or SQLite)
        db.create_all()
        
        from flask_migrate import init, migrate, upgrade
        init()
        migrate(message='initial migration')
        upgrade()

def seed_database(app):
    with app.app_context():

        # Create Slack messages
        messages = [
            {
                "project": "engineering-incidents", 
                "message": "Incident Reported – Authentication Service Down",
                "sender": "System",
                "sent_at": datetime(2024, 3, 18, 10, 5).isoformat(),
                "status": "read"
            },
            {
                "project": "engineering-incidents",
                "message": "Getting reports that users can't log in. Checking logs now.",
                "sender": "Mark", 
                "sent_at": datetime(2024, 3, 18, 10, 5).isoformat(),
                "status": "read"
            },
            {
                "project": "engineering-incidents",
                "message": "Seeing a spike in 500s from the auth service. Looks like a DB connection issue?",
                "sender": "Charlie",
                "sent_at": datetime(2024, 3, 18, 10, 5).isoformat(),
                "status": "read"
            },
            {
                "project": "engineering-incidents",
                "message": "Monitoring dashboards—requests are piling up, latency is through the roof. Something is definitely off.",
                "sender": "Priya",
                "sent_at": datetime(2024, 3, 18, 10, 5).isoformat(),
                "status": "read"
            },
            {
                "project": "engineering-incidents",
                "message": "Customer Support is blowing up—users locked out across all regions. Do we have an ETA?",
                "sender": "Samantha",
                "sent_at": datetime(2024, 3, 18, 10, 5).isoformat(),
                "status": "read"
            },
            {
                "project": "engineering-incidents",
                "message": "Rolling back the latest auth-service deployment. Might be related.",
                "sender": "Mark",
                "sent_at": datetime(2024, 3, 18, 10, 5).isoformat(),
                "status": "read"
            },
            {
                "project": "engineering-incidents",
                "message": "Rollback didn't fix it. Issue persists.",
                "sender": "Charlie",
                "sent_at": datetime(2024, 3, 18, 10, 30).isoformat(),
                "status": "read"
            },
            {
                "project": "engineering-incidents",
                "message": "Confirming—DB connections are maxed out, seeing timeouts in the pool.",
                "sender": "Priya",
                "sent_at": datetime(2024, 3, 18, 10, 30).isoformat(),
                "status": "read"
            },
            {
                "project": "engineering-incidents",
                "message": "Could this be related to last week's infra changes? We updated how auth-service handles connection retries.",
                "sender": "Mark",
                "sent_at": datetime(2024, 3, 18, 10, 30).isoformat(),
                "status": "read"
            },
            {
                "project": "engineering-incidents",
                "message": "Just got a message from the VP—this is impacting a key client. We need updates every 30 mins.",
                "sender": "Samantha",
                "sent_at": datetime(2024, 3, 18, 10, 30).isoformat(),
                "status": "read"
            },
            {
                "project": "engineering-incidents",
                "message": "Narrowed it down—seems like a new rate-limit check is failing and blocking auth requests. Investigating fix.",
                "sender": "Charlie",
                "sent_at": datetime(2024, 3, 18, 11, 15).isoformat(),
                "status": "read"
            },
            {
                "project": "engineering-incidents",
                "message": "We can manually clear blocked requests, but that's not a real fix. Need a patch.",
                "sender": "Mark",
                "sent_at": datetime(2024, 3, 18, 11, 15).isoformat(),
                "status": "read"
            },
            {
                "project": "engineering-incidents",
                "message": "Temp fix deployed—extended connection timeout as a stopgap. Users still seeing issues, though.",
                "sender": "Priya",
                "sent_at": datetime(2024, 3, 18, 11, 15).isoformat(),
                "status": "read"
            },
            {
                "project": "engineering-incidents",
                "message": "Pushed a hotfix—disabled the faulty rate-limit check. Seeing normal auth traffic now. Can someone confirm?",
                "sender": "Charlie",
                "sent_at": datetime(2024, 3, 18, 12, 45).isoformat(),
                "status": "read"
            },
            {
                "project": "engineering-incidents",
                "message": "Metrics are stabilizing. Logins are back up. Looks good so far.",
                "sender": "Priya",
                "sent_at": datetime(2024, 3, 18, 12, 45).isoformat(),
                "status": "read"
            },
            {
                "project": "engineering-incidents",
                "message": "Customer Support confirms logins are working for most users. Still waiting on final confirmation from some clients.",
                "sender": "Samantha",
                "sent_at": datetime(2024, 3, 18, 12, 45).isoformat(),
                "status": "unread"
            },
            {
                "project": "engineering-incidents",
                "message": "Declaring the incident resolved. Postmortem scheduled for Wednesday. Thanks, everyone!",
                "sender": "Priya",
                "sent_at": datetime(2024, 3, 18, 15, 30).isoformat(),
                "status": "unread"
            }
        ]

        # Convert messages to Slack model instances
        slack_messages = [
            Slack(
                project=message["project"],
                message=message["message"], 
                sender=message["sender"],
                sent_at=datetime.fromisoformat(message["sent_at"]),
                status=message["status"]
            )
            for message in messages
        ]

        # Add all messages to the database
        db.session.add_all(slack_messages)
        db.session.commit()

if __name__ == '__main__':
    app = create_app()
    reset_database(app)
    seed_database(app)