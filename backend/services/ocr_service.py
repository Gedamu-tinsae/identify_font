"""
OCR analysis service module
Handles OCR text extraction from PDF images
"""
import pdfplumber


def extract_text_from_images_ocr_simple(pdf_path):
    """
    Simpler OCR function that extracts text from PDF pages treated as images
    """
    try:
        import pytesseract
        from PIL import Image
    except ImportError:
        return {
            'error': 'OCR functionality requires pytesseract and PIL packages',
            'ocr_results': []
        }

    ocr_results = []
    
    with pdfplumber.open(pdf_path) as pdf:
        for page_number, page in enumerate(pdf.pages, start=1):
            try:
                # Convert the page to an image
                page_image = page.to_image(resolution=300)
                pil_image = page_image.original
                
                # Perform OCR on the page image
                text = pytesseract.image_to_string(pil_image)
                
                ocr_results.append({
                    'page': page_number,
                    'extracted_text': text.strip()
                })
            except Exception as e:
                print(f"Error performing OCR on page {page_number}: {e}")
                continue
    
    return {
        'ocr_results': ocr_results
    }


def extract_text_from_images_ocr(pdf_path, output_file=None):
    """
    Extract text from images within PDF using OCR (app3.py functionality)
    """
    try:
        import pytesseract
        from PIL import Image
    except ImportError:
        return {
            'error': 'OCR functionality requires pytesseract and PIL packages',
            'ocr_results': []
        }

    ocr_results = []
    
    with pdfplumber.open(pdf_path) as pdf:
        for page_number, page in enumerate(pdf.pages, start=1):
            page_images = []
            
            # Extract images from the page
            for obj_type, objs in page.objects.items():
                if obj_type == 'image':
                    for obj_idx, obj in enumerate(objs):
                        try:
                            # Extract the image
                            # Convert the PDF page to an image with high resolution for better OCR
                            page_image = page.to_image(resolution=300)
                            
                            # Use a different approach to extract the specific image object
                            # Save the specific image object to a temporary buffer
                            img = Image.from_dict(obj)
                            # Perform OCR on the image
                            text = pytesseract.image_to_string(img)
                            
                            page_images.append({
                                'page': page_number,
                                'image_index': obj_idx,
                                'extracted_text': text.strip()
                            })
                        except Exception as e:
                            print(f"Error processing image object: {e}")
                            continue
            
            # Alternative approach: Extract all images using pdfplumber's .to_image() method
            # This approach handles images differently
            if not page_images:
                try:
                    # Extract using the page image approach
                    pil_image = page.to_image(resolution=300).original
                    text = pytesseract.image_to_string(pil_image)
                    
                    page_images.append({
                        'page': page_number,
                        'image_index': 0,
                        'extracted_text': text.strip()
                    })
                except Exception as e:
                    print(f"Error in alternative OCR approach: {e}")
                    continue
            
            ocr_results.extend(page_images)
    
    # If output file is specified, write results to it
    if output_file:
        with open(output_file, 'w', encoding='utf-8') as f:
            for result in ocr_results:
                f.write(f"\nPage {result['page']}:\n")
                f.write(f"Extracted text: {result['extracted_text']}\n")
    
    return {
        'ocr_results': ocr_results
    }