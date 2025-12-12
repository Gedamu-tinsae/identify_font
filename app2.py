import pdfplumber

def extract_font_sizes(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        for page_number, page in enumerate(pdf.pages, start=1):
            print(f"\nPage {page_number}:")
            for char in page.chars:
                print(f"Text: '{char.get('text')}' - Font: {char.get('fontname')}, Size: {char.get('size')}")

# Provide the path to your PDF
extract_font_sizes(r'C:\Users\80\Desktop\py-utils\identify_font\todo-GRE-2021-2-page.pdf')


#this works
