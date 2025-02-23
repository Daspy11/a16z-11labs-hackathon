from flask import jsonify, current_app
from elevenlabs import ElevenLabs
from app.routes import bp
import requests
import time
import json
import os

@bp.route('/convo/<conversation_id>', methods=['GET'])
def get_conversation(conversation_id):
    try:
        print(f"Conversation ID: {conversation_id}")
        client = ElevenLabs(
            api_key=current_app.config['ELEVENLABS_API_KEY']
        )
        
        # Poll for up to 1 minute (12 attempts, 5 seconds apart)
        max_attempts = 12
        attempt = 0
        
        while attempt < max_attempts:
            try:
                response = client.conversational_ai.get_conversation(
                    conversation_id=conversation_id
                )
                
                # If we get here, we have a valid response
                # Post the response to the webhook
                webhook_url = "https://hook.eu2.make.com/x7w2hrvzxrjh8yvu6fxstmmj903b568u"
                webhook_response = requests.post(webhook_url, json=response.dict()['transcript'])
                
                # Return both the conversation data and webhook status
                return jsonify({
                    "conversation": response.dict()['transcript'],
                    "webhook_status": webhook_response.status_code
                })
                
            except Exception as e:
                # If this is a specific error indicating conversation not ready,
                # continue polling. Otherwise, raise the exception
                if "Conversation not found" in str(e):
                    attempt += 1
                    if attempt < max_attempts:
                        time.sleep(5)
                        continue
                raise e
                
        # If we get here, we've exceeded max attempts
        return jsonify({
            "message": "Timeout waiting for conversation",
            "error": "Conversation not available after 60 seconds"
        }), 408

    except Exception as e:
        return jsonify({
            "message": "Failed to fetch conversation or post to webhook",
            "error": str(e)
        }), 500

@bp.route('/hardcoded_convo', methods=['GET'])
def get_hardcoded_conversation():
    try:
        conversation_id = "zEKucYo1rvhQClAVcDKx"
        client = ElevenLabs(
            api_key=current_app.config['ELEVENLABS_API_KEY']
        )
        response = client.conversational_ai.get_conversation(
            conversation_id=conversation_id
        )
        
        # Get the transcript
        transcript = response.dict()['transcript']
        
        # Get the base directory (where app folder is located)
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
        
        # Create the full path to transcript.json in the data folder
        transcript_path = os.path.join(base_dir, 'data', 'transcript.json')
        
        # Save transcript to JSON file
        with open(transcript_path, 'w') as f:
            json.dump(transcript, f, indent=2)
        
        # Return the transcript in the response
        return jsonify(transcript)
    except Exception as e:
        return jsonify({
            "message": "Failed to fetch conversation or post to webhook",
            "error": str(e)
        }), 500
