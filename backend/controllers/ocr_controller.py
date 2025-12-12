"""
OCR analysis controller module
Handles the business logic for OCR analysis endpoints
"""
import logging
try:
    # Try relative imports first (when run as part of the package)
    from ..services.ocr_service import extract_text_from_images_ocr_simple
    from ..services.file_service import save_uploaded_file, cleanup_file
    from ..config import UPLOAD_FOLDER
except ImportError:
    # Fall back to absolute imports (when run directly)
    from services.ocr_service import extract_text_from_images_ocr_simple
    from services.file_service import save_uploaded_file, cleanup_file
    from config import UPLOAD_FOLDER

logger = logging.getLogger(__name__)


def process_ocr_analysis(file):
    """Process OCR analysis to extract text from PDF images"""
    filepath = save_uploaded_file(file, UPLOAD_FOLDER)
    if not filepath:
        return {'error': 'Invalid file type. Only PDF files are allowed.'}, 400
    
    try:
        ocr_data = extract_text_from_images_ocr_simple(filepath)
        return {
            'success': True,
            'filename': file.filename,
            'ocr_analysis': ocr_data
        }, 200
    except Exception as e:
        logger.error(f"Error processing PDF for OCR: {str(e)}")
        return {'error': f'Failed to process PDF for OCR: {str(e)}'}, 500
    finally:
        # Clean up uploaded file after processing
        cleanup_file(filepath)