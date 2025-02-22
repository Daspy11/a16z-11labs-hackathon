FROM python:3.11-slim
WORKDIR /app

# Install dependencies (no-cache is better for prod, where image size matters)
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Set and expose port
ENV PORT=8080
EXPOSE 8080

# Run DB migrations and start prod Gunicorn server
CMD gunicorn wsgi:app --bind 0.0.0.0:$PORT --workers=3 --log-level=info