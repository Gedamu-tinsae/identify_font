"""
Font analysis service module
Handles all font-related PDF analysis functionality
"""
import pdfplumber
from pdfminer.pdfparser import PDFParser
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdftypes import resolve1
from pdfminer.psparser import PSException
from collections import defaultdict


def extract_fonts_from_pdf(pdf_path):
    """
    Extract font information from a PDF using pdfplumber (app2.py approach)
    """
    fonts_info = []
    
    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages):
            # Extract character-level information
            chars = page.chars if hasattr(page, 'chars') else []
            
            for char in chars:
                font_name = char.get('fontname', 'Unknown')
                font_size = char.get('size', 0)
                
                # Check if this font info already exists to avoid duplicates
                existing_font = None
                for font in fonts_info:
                    if font['name'] == font_name and font['size'] == font_size:
                        existing_font = font
                        break
                
                if not existing_font:
                    fonts_info.append({
                        'name': font_name,
                        'size': font_size,
                        'page': page_num + 1
                    })
    
    return fonts_info


def extract_fonts_basic(pdf_path):
    """
    Extract font information from a PDF using pdfminer (app.py approach)
    """
    font_data = []
    
    with open(pdf_path, 'rb') as pdf_file:
        parser = PDFParser(pdf_file)
        document = PDFDocument(parser)

        # Extract font details from the PDF
        try:
            # Try to extract fonts from the document resources
            fonts = resolve1(document.catalog['Resources'])['Font']
            for font_name, font_details in fonts.items():
                font_data.append({
                    'name': str(font_name),
                    'details': str(font_details)
                })
        except KeyError:
            # If AcroForm approach doesn't work, try Resources approach
            try:
                fonts = resolve1(document.catalog['AcroForm'])['DR']['Font']
                for font_name, font_details in fonts.items():
                    font_data.append({
                        'name': str(font_name),
                        'details': str(font_details)
                    })
            except KeyError:
                print("No fonts found or unsupported PDF format.")
    
    return font_data


def extract_fonts_advanced(pdf_path):
    """
    Extract font information from a PDF using both pdfminer and pdfplumber
    """
    font_data = {
        'basic_info': [],
        'by_page': {},
        'statistics': {}
    }
    
    # Use pdfminer for basic font extraction
    try:
        with open(pdf_path, 'rb') as pdf_file:
            parser = PDFParser(pdf_file)
            document = PDFDocument(parser)
            
            # Try to extract font info from resources
            fonts = defaultdict(int)
            
            for page_index in range(len(document.get_pages())):
                page = document.get_pages()[page_index]
                
                if 'Resources' in page.attrs:
                    resources = page.attrs['Resources']
                    if 'Font' in resources:
                        font_resources = resolve1(resources['Font'])
                        for font_name, font_obj in font_resources.items():
                            font_subtype = resolve1(font_obj.get('Subtype', 'Unknown'))
                            font_basefont = resolve1(font_obj.get('BaseFont', 'Unknown'))
                            
                            fonts[str(font_name)] += 1
                            
                            font_data['basic_info'].append({
                                'name': str(font_name),
                                'subtype': str(font_subtype),
                                'basefont': str(font_basefont)
                            })
    except (PSException, TypeError, KeyError) as e:
        # If pdfminer fails, we'll continue with pdfplumber data
        print(f"Warning: Could not extract fonts using pdfminer: {e}")
    
    # Use pdfplumber for detailed character-level analysis
    try:
        with pdfplumber.open(pdf_path) as pdf:
            total_chars = 0
            font_usage_stats = defaultdict(lambda: {'count': 0, 'pages': set()})
            
            for page_num, page in enumerate(pdf.pages):
                page_fonts = []
                
                # Extract character-level font information
                chars = page.chars if hasattr(page, 'chars') else []
                
                for char in chars:
                    font_name = char.get('fontname', 'Unknown')
                    font_size = round(char.get('size', 0), 2)
                    font_color = char.get('non_stroke_color', 'Unknown')
                    
                    # Count font usage
                    font_key = f"{font_name}_{font_size}"
                    font_usage_stats[font_key]['count'] += 1
                    font_usage_stats[font_key]['pages'].add(page_num + 1)
                    
                    page_font_info = {
                        'name': font_name,
                        'size': font_size,
                        'color': font_color,
                        'x': round(char.get('x0', 0), 2),
                        'y': round(char.get('top', 0), 2)
                    }
                    
                    # Check for duplicate entries
                    if page_font_info not in page_fonts:
                        page_fonts.append(page_font_info)
                    
                    total_chars += 1
                
                font_data['by_page'][f'page_{page_num + 1}'] = {
                    'fonts': page_fonts,
                    'char_count': len(chars)
                }
            
            # Prepare statistics
            for font_key, stats in font_usage_stats.items():
                font_name, font_size = font_key.rsplit('_', 1)  # Split only on the last underscore
                font_data['statistics'][font_key] = {
                    'font_name': font_name,
                    'font_size': float(font_size),
                    'usage_count': stats['count'],
                    'pages_used': sorted(list(stats['pages']))
                }
    
    except Exception as e:
        print(f"Error processing with pdfplumber: {e}")
    
    return font_data


def extract_text_with_fonts(pdf_path):
    """
    Extract text along with font information from a PDF
    """
    text_with_fonts = []
    
    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages):
            chars = page.chars if hasattr(page, 'chars') else []
            
            page_text_data = []
            for char in chars:
                char_data = {
                    'text': char.get('text', ''),
                    'fontname': char.get('fontname', 'Unknown'),
                    'size': round(char.get('size', 0), 2),
                    'x': char.get('x0', 0),
                    'y': char.get('top', 0)
                }
                page_text_data.append(char_data)
            
            text_with_fonts.append({
                'page': page_num + 1,
                'characters': page_text_data
            })
    
    return text_with_fonts