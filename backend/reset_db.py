import os
import json
import shutil
from app import create_app, db
from app.models import Slack, Email, Calendar
from datetime import datetime

# Get the directory where reset_db.py is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

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
        # Load data from JSON files using relative paths
        with open(os.path.join(BASE_DIR, 'data', 'seed_slack.JSON'), 'r') as f:
            slack_data = json.load(f)
        
        with open(os.path.join(BASE_DIR, 'data', 'seed_email.JSON'), 'r') as f:
            email_data = json.load(f)

        with open(os.path.join(BASE_DIR, 'data', 'seed_calendar.JSON'), 'r') as f:
            calendar_data = json.load(f)

        # Convert messages to model instances
        slack_messages = [
            Slack(
                project=message["project"],
                message=message["message"], 
                sender=message["sender"],
                sent_at=datetime.fromisoformat(message["sent_at"]),
                status=message["status"]
            )
            for message in slack_data["messages"]
        ]

        email_messages = [
            Email(
                subject=message["subject"],
                body=message["body"],
                sender=message["sender"],
                received_at=datetime.fromisoformat(message["received_at"]),
                status=message["status"]
            )
            for message in email_data["messages"]
        ]

        calendar_events = [
            Calendar(
                title=event["title"],
                start_datetime=datetime.fromisoformat(event["start_datetime"]),
                end_datetime=datetime.fromisoformat(event["end_datetime"]),
                participant_name=event["participant_name"],
                agenda=event["agenda"],
                status=event["status"]
            )
            for event in calendar_data["events"]
        ]

        # Add all records to the database
        db.session.add_all(slack_messages)
        db.session.add_all(email_messages)
        db.session.add_all(calendar_events)
        db.session.commit()

if __name__ == '__main__':
    app = create_app()
    reset_database(app)
    seed_database(app)