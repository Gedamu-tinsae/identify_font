"""
Font analysis routes module
Defines all font-related API endpoints
"""
from flask import Blueprint, request, jsonify
from ..controllers.font_controller import process_basic_font_analysis, process_detailed_font_analysis, process_advanced_font_analysis

font_bp = Blueprint('font', __name__, url_prefix='/api/fonts')


@font_bp.route('/basic', methods=['POST'])
def basic_analysis():
    """Basic font analysis using pdfminer"""
    if 'pdf_file' not in request.files:
        return jsonify({'error': 'No PDF file provided'}), 400
    
    file = request.files['pdf_file']
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    result, status_code = process_basic_font_analysis(file)
    return jsonify(result), status_code


@font_bp.route('/advanced', methods=['POST'])
def advanced_analysis():
    """Advanced font analysis using both pdfminer and pdfplumber"""
    if 'pdf_file' not in request.files:
        return jsonify({'error': 'No PDF file provided'}), 400
    
    file = request.files['pdf_file']
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    result, status_code = process_advanced_font_analysis(file)
    return jsonify(result), status_code