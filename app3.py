import pdfplumber
import pytesseract
from PIL import Image

# Set the path to the Tesseract executable
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def extract_text_from_image(image):
    return pytesseract.image_to_string(image)

def extract_font_sizes(pdf_path, output_file):
    try:
        with pdfplumber.open(pdf_path) as pdf, open(output_file, 'w', encoding='utf-8') as f:
            print(f"Successfully opened PDF: {pdf_path}")
            if not pdf.pages:
                print("No pages found in the PDF.")
                return
            for page_number, page in enumerate(pdf.pages, start=1):
                print(f"\nPage {page_number}:")
                f.write(f"\nPage {page_number}:\n")
                # Extract images from the page
                for obj_type, objs in page.objects.items():
                    if obj_type == 'image':
                        for obj in objs:
                            # Extract the image
                            image = page.to_image(resolution=300).original
                            # Perform OCR on the image
                            text = extract_text_from_image(image)
                            print(f"Extracted text: {text}")
                            f.write(f"{text}\n")
    except Exception as e:
        print(f"An error occurred: {e}")

# Provide the path to your PDF and the output file
extract_font_sizes(r'C:\Users\80\Desktop\py-utils\identify_font\test\todo-GRE-2021-2-page.pdf', 'extracted_text.txt')

# BS