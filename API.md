# PDF Font Identifier API Documentation

## Overview
The PDF Font Identifier API provides multiple methods for analyzing fonts and extracting text from PDF documents using different approaches.

## Endpoints

### 1. GET /
**Description:** Get API information and available endpoints
**Response:**
```json
{
  "message": "PDF Font Identification API",
  "endpoints": {
    "/api/upload": "POST - Upload PDF for font analysis",
    "/api/fonts/basic": "POST - Basic font analysis using pdfminer",
    "/api/fonts/advanced": "POST - Advanced font analysis using pdfminer and pdfplumber",
    "/api/fonts/ocr": "POST - OCR text extraction from PDF images",
    "/api/health": "GET - Health check"
  }
}
```

### 2. POST /api/upload
**Description:** Detailed font analysis using pdfplumber (from original app2.py)
**Method:** POST
**Content-Type:** multipart/form-data
**Request Body:** 
- `pdf_file`: PDF file to analyze
**Response:**
```json
{
  "success": true,
  "filename": "example.pdf",
  "font_analysis": [
    {
      "name": "font_name",
      "size": 12,
      "page": 1
    }
  ]
}
```

### 3. POST /api/fonts/basic
**Description:** Basic font analysis using pdfminer (from original app.py)
**Method:** POST
**Content-Type:** multipart/form-data
**Request Body:** 
- `pdf_file`: PDF file to analyze
**Response:**
```json
{
  "success": true,
  "filename": "example.pdf",
  "font_analysis": [
    {
      "name": "font_name",
      "details": "font_details"
    }
  ]
}
```

### 4. POST /api/fonts/advanced
**Description:** Advanced font analysis combining pdfminer and pdfplumber approaches
**Method:** POST
**Content-Type:** multipart/form-data
**Request Body:** 
- `pdf_file`: PDF file to analyze
**Response:**
```json
{
  "success": true,
  "filename": "example.pdf",
  "font_analysis": {
    "basic_info": [...],
    "by_page": {...},
    "statistics": {...}
  }
}
```

### 5. POST /api/fonts/ocr
**Description:** OCR analysis to extract text from images in PDF (from original app3.py)
**Method:** POST
**Content-Type:** multipart/form-data
**Request Body:** 
- `pdf_file`: PDF file to analyze
**Response:**
```json
{
  "success": true,
  "filename": "example.pdf",
  "ocr_analysis": {
    "ocr_results": [
      {
        "page": 1,
        "extracted_text": "extracted text from page 1"
      }
    ]
  }
}
```

### 6. GET /api/health
**Description:** Check API health status
**Response:**
```json
{
  "status": "healthy"
}
```

## Installation and Setup

### Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `pip install -r requirements.txt`
3. Run the server: `python app.py`

### Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start development server: `npm start`

## Original Implementation Sources
- **Basic Analysis (pdfminer)**: Based on original `app.py`
- **Detailed Analysis (pdfplumber)**: Based on original `app2.py` 
- **OCR Analysis**: Based on original `app3.py`
- **Advanced Analysis**: Enhanced combination of multiple approaches