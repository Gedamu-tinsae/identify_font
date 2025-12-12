"""
OCR analysis routes module
Defines OCR-related API endpoints
"""
from flask import Blueprint, request, jsonify
try:
    # Try relative imports first (when run as part of the package)
    from ..controllers.ocr_controller import process_ocr_analysis
except ImportError:
    # Fall back to absolute imports (when run directly)
    from controllers.ocr_controller import process_ocr_analysis

ocr_bp = Blueprint('ocr', __name__, url_prefix='/api/fonts')


@ocr_bp.route('/ocr', methods=['POST'])
def ocr_analysis():
    """OCR text extraction from PDF images"""
    if 'pdf_file' not in request.files:
        return jsonify({'error': 'No PDF file provided'}), 400
    
    file = request.files['pdf_file']
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    result, status_code = process_ocr_analysis(file)
    return jsonify(result), status_code