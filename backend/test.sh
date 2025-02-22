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

# Run tests with different options
case "$1" in
  "coverage")
    pytest --cov=app tests/
    ;;
  "verbose")
    pytest -v tests/
    ;;
  *)
    pytest tests/
    ;;
esac