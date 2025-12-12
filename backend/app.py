from flask import Flask, jsonify
import logging
from config import UPLOAD_FOLDER, MAX_CONTENT_LENGTH

# Initialize Flask app
app = Flask(__name__)

# Configuration
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH

# Ensure upload folder exists
UPLOAD_FOLDER.mkdir(exist_ok=True)

# Logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Import and register blueprints after app initialization to avoid circular imports
def register_blueprints():
    try:
        # Try relative imports first (when run as part of the package)
        from .routes.font_routes import font_bp
        from .routes.ocr_routes import ocr_bp
        from .routes.upload_routes import upload_bp
    except ImportError:
        # Fall back to absolute imports (when run directly)
        from routes.font_routes import font_bp
        from routes.ocr_routes import ocr_bp
        from routes.upload_routes import upload_bp

    app.register_blueprint(font_bp)
    app.register_blueprint(ocr_bp)
    app.register_blueprint(upload_bp)

# Register blueprints
register_blueprints()

@app.route('/')
def home():
    return jsonify({
        'message': 'PDF Font Identification API',
        'endpoints': {
            '/api/upload': 'POST - Upload PDF for font analysis',
            '/api/fonts/basic': 'POST - Basic font analysis using pdfminer',
            '/api/fonts/advanced': 'POST - Advanced font analysis using pdfminer and pdfplumber',
            '/api/fonts/ocr': 'POST - OCR text extraction from PDF images',
            '/api/health': 'GET - Health check'
        }
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)