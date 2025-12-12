"""
Font analysis controller module
Handles the business logic for font analysis endpoints
"""
import logging
try:
    # Try relative imports first (when run as part of the package)
    from ..services.font_service import extract_fonts_from_pdf, extract_fonts_basic, extract_fonts_advanced
    from ..services.file_service import save_uploaded_file, cleanup_file
    from ..config import UPLOAD_FOLDER
except ImportError:
    # Fall back to absolute imports (when run directly)
    from services.font_service import extract_fonts_from_pdf, extract_fonts_basic, extract_fonts_advanced
    from services.file_service import save_uploaded_file, cleanup_file
    from config import UPLOAD_FOLDER

logger = logging.getLogger(__name__)


def process_basic_font_analysis(file):
    """Process basic font analysis using pdfminer"""
    filepath = save_uploaded_file(file, UPLOAD_FOLDER)
    if not filepath:
        return {'error': 'Invalid file type. Only PDF files are allowed.'}, 400
    
    try:
        font_data = extract_fonts_basic(filepath)
        return {
            'success': True,
            'filename': file.filename,
            'font_analysis': font_data
        }, 200
    except Exception as e:
        logger.error(f"Error processing PDF for basic analysis: {str(e)}")
        return {'error': f'Failed to process PDF: {str(e)}'}, 500
    finally:
        # Clean up uploaded file after processing
        cleanup_file(filepath)


def process_detailed_font_analysis(file):
    """Process detailed font analysis using pdfplumber (app2.py functionality)"""
    filepath = save_uploaded_file(file, UPLOAD_FOLDER)
    if not filepath:
        return {'error': 'Invalid file type. Only PDF files are allowed.'}, 400
    
    try:
        font_data = extract_fonts_from_pdf(filepath)
        return {
            'success': True,
            'filename': file.filename,
            'font_analysis': font_data
        }, 200
    except Exception as e:
        logger.error(f"Error processing PDF for detailed analysis: {str(e)}")
        return {'error': f'Failed to process PDF: {str(e)}'}, 500
    finally:
        # Clean up uploaded file after processing
        cleanup_file(filepath)


def process_advanced_font_analysis(file):
    """Process advanced font analysis using both pdfminer and pdfplumber"""
    filepath = save_uploaded_file(file, UPLOAD_FOLDER)
    if not filepath:
        return {'error': 'Invalid file type. Only PDF files are allowed.'}, 400
    
    try:
        font_data = extract_fonts_advanced(filepath)
        return {
            'success': True,
            'filename': file.filename,
            'font_analysis': font_data
        }, 200
    except Exception as e:
        logger.error(f"Error processing PDF for advanced analysis: {str(e)}")
        return {'error': f'Failed to process PDF: {str(e)}'}, 500
    finally:
        # Clean up uploaded file after processing
        cleanup_file(filepath)