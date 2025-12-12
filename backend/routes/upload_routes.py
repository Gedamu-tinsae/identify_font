"""
Upload routes module
Defines the main upload endpoint for detailed analysis
"""
from flask import Blueprint, request, jsonify
try:
    # Try relative imports first (when run as part of the package)
    from ..controllers.font_controller import process_detailed_font_analysis
except ImportError:
    # Fall back to absolute imports (when run directly)
    from controllers.font_controller import process_detailed_font_analysis

upload_bp = Blueprint('upload', __name__)


@upload_bp.route('/api/upload', methods=['POST'])
def upload_analysis():
    """Detailed font analysis using pdfplumber (app2.py functionality)"""
    if 'pdf_file' not in request.files:
        return jsonify({'error': 'No PDF file provided'}), 400
    
    file = request.files['pdf_file']
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    result, status_code = process_detailed_font_analysis(file)
    return jsonify(result), status_code