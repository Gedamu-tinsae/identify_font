from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
import uuid
import logging

# Import font identification functions and config
from pdf_analyzer import extract_fonts_from_pdf, extract_fonts_advanced
from config import UPLOAD_FOLDER, MAX_CONTENT_LENGTH, ALLOWED_EXTENSIONS

app = Flask(__name__)

# Configuration
app.config['UPLOAD_FOLDER'] = str(UPLOAD_FOLDER)
app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH

# Ensure upload folder exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def home():
    return jsonify({
        'message': 'PDF Font Identification API',
        'endpoints': {
            '/api/upload': 'POST - Upload PDF for font analysis',
            '/api/fonts/advanced': 'POST - Advanced font analysis',
            '/api/health': 'GET - Health check'
        }
    })

@app.route('/api/upload', methods=['POST'])
def upload_pdf():
    try:
        if 'pdf_file' not in request.files:
            return jsonify({'error': 'No PDF file provided'}), 400
        
        file = request.files['pdf_file']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not file or not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type. Only PDF files are allowed.'}), 400
        
        # Secure filename and save
        filename = secure_filename(file.filename)
        unique_filename = f"{uuid.uuid4()}_{filename}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
        file.save(filepath)
        
        # Process the PDF for font extraction
        try:
            font_data = extract_fonts_from_pdf(filepath)
            
            # Clean up uploaded file after processing
            # os.remove(filepath)  # Uncomment if you don't want to store files long-term
            
            return jsonify({
                'success': True,
                'filename': filename,
                'font_analysis': font_data
            })
        except Exception as e:
            logger.error(f"Error processing PDF: {str(e)}")
            return jsonify({'error': f'Failed to process PDF: {str(e)}'}), 500
            
    except Exception as e:
        logger.error(f"Upload error: {str(e)}")
        return jsonify({'error': f'Upload failed: {str(e)}'}), 500

@app.route('/api/fonts/advanced', methods=['POST'])
def analyze_fonts_advanced():
    try:
        if 'pdf_file' not in request.files:
            return jsonify({'error': 'No PDF file provided'}), 400
        
        file = request.files['pdf_file']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not file or not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type. Only PDF files are allowed.'}), 400
        
        # Secure filename and save
        filename = secure_filename(file.filename)
        unique_filename = f"{uuid.uuid4()}_{filename}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
        file.save(filepath)
        
        # Process the PDF for advanced font extraction
        try:
            font_data = extract_fonts_advanced(filepath)
            
            # Clean up uploaded file after processing
            # os.remove(filepath)  # Uncomment if you don't want to store files long-term
            
            return jsonify({
                'success': True,
                'filename': filename,
                'font_analysis': font_data
            })
        except Exception as e:
            logger.error(f"Error processing PDF: {str(e)}")
            return jsonify({'error': f'Failed to process PDF: {str(e)}'}), 500
            
    except Exception as e:
        logger.error(f"Upload error: {str(e)}")
        return jsonify({'error': f'Upload failed: {str(e)}'}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)