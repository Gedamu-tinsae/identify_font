import os
from pathlib import Path

# Application configuration
BASE_DIR = Path(__file__).resolve().parent

# Upload configuration
UPLOAD_FOLDER = BASE_DIR / 'uploads'
MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB
ALLOWED_EXTENSIONS = {'pdf'}

# Ensure upload directory exists
UPLOAD_FOLDER.mkdir(exist_ok=True)

# API Configuration
API_VERSION = 'v1'
DEBUG = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'

# Logging
LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')
LOG_FILE = BASE_DIR / 'app.log'