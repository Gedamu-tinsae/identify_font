from pdfminer.pdfparser import PDFParser
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdftypes import resolve1

def extract_fonts(pdf_path):
    with open(pdf_path, 'rb') as pdf_file:
        parser = PDFParser(pdf_file)
        document = PDFDocument(parser)
        
        # Extract font details from the PDF
        try:
            fonts = resolve1(document.catalog['AcroForm'])['DR']['Font']
            for font_name, font_details in fonts.items():
                print(f"Font: {font_name}")
                print(f"Details: {font_details}")
        except KeyError:
            print("No fonts found or unsupported PDF format.")

# Provide the path to your PDF
extract_fonts(r'C:\Users\80\Desktop\py-utils\identify_font\test\todo-GRE-2021-2-page.pdf')