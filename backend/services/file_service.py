"""
File handling service module
Handles file validation, saving, and cleanup operations
"""
import os
import uuid
from werkzeug.utils import secure_filename


def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'pdf'}
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def save_uploaded_file(file, upload_folder):
    """Save uploaded file with a unique name"""
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        unique_filename = f"{uuid.uuid4()}_{filename}"
        filepath = os.path.join(upload_folder, unique_filename)
        file.save(filepath)
        return filepath
    return None

def cleanup_file(filepath):
    """Remove file from disk"""
    try:
        if os.path.exists(filepath):
            os.remove(filepath)
            return True
    except Exception:
        pass
    return False

def format_font_data_for_response(font_data):
    """Format font data for API response"""
    return {
        'fonts_found': len(font_data.get('basic_info', [])),
        'pages_analyzed': len(font_data.get('by_page', {})),
        'detailed_analysis': font_data
    }