#!/bin/bash

# Check correct number of arguments
if [ "$#" -ne 2 ]; then
    echo "Usage: ./boot.sh <environment> <server>"
    echo "  environment: venv | docker"
    echo "  server: dev | prod"
    exit 1
fi

# Set default values
ENVIRONMENT=$1
SERVER_TYPE=$2

# Validate arguments
if [ "$ENVIRONMENT" != "venv" ] && [ "$ENVIRONMENT" != "docker" ]; then
    echo "Error: environment must be 'venv' or 'docker'"
    exit 1
fi

if [ "$SERVER_TYPE" != "dev" ] && [ "$SERVER_TYPE" != "prod" ]; then
    echo "Error: server must be 'dev' or 'prod'"
    exit 1
fi

if [ "$SERVER_TYPE" = "prod" ]; then
    ENV_FILE=".env.prod"
    SERVER_CMD="gunicorn wsgi:app --bind 0.0.0.0:8080 --workers=3 --log-level=info"
else
    ENV_FILE=".env.local"
    SERVER_CMD="python run.py"
fi

# Check for required environment file
if [ ! -f "$ENV_FILE" ]; then
    echo "Error: Missing $ENV_FILE file"
    echo "Please create it by copying .env.example:"
    echo "cp .env.example $ENV_FILE"
    exit 1
fi

# Handle virtual environment setup
if [ "$ENVIRONMENT" = "venv" ]; then
    if [ -d ".venv" ]; then
        source .venv/bin/activate
        PYTHON_VERSION=$(python -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")')

        if [ "$PYTHON_VERSION" != "3.11" ]; then
            echo "Error: Wrong Python version. Expected 3.11, found $PYTHON_VERSION"
            deactivate
            exit 1
        fi
    else
        echo "Creating virtual environment..."
        python3.11 -m venv .venv
        source .venv/bin/activate
    fi

    export ENV_FILE
    pip install --no-cache-dir -r requirements.txt
    eval "$SERVER_CMD"
else
    if [ "$SERVER_TYPE" = "prod" ]; then
        docker compose -f docker-compose.prod.yml up --build
    else
        docker compose -f docker-compose.yml up --build
    fi
fi