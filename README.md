# PDF Font Identifier

A full-stack web application for identifying and analyzing fonts used in PDF documents.

## Features

- Upload PDF files for font analysis
- Identify fonts by name, size, and page location
- Detailed font usage statistics
- Advanced analysis with character-level information
- Responsive web interface

## Project Structure

```
identify_font/
├── backend/                 # Flask API server
│   ├── app.py              # Main Flask application
│   ├── pdf_analyzer.py     # PDF font analysis functions
│   ├── models.py           # Data models
│   ├── utils.py            # Utility functions
│   ├── config.py           # Configuration settings
│   └── requirements.txt    # Backend dependencies
├── frontend/               # React web application
│   ├── public/             # Public assets
│   ├── src/                # Source code
│   │   ├── App.js          # Main application component
│   │   ├── App.css         # Styles
│   │   └── ...
│   ├── package.json        # Frontend dependencies
│   └── ...
├── .vscode/                # VS Code settings
├── test/                   # Test PDF files
├── .gitignore              # Git ignore rules
└── requirements.txt        # Root dependencies
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install backend dependencies:
```bash
pip install -r requirements.txt
```

3. Run the backend server:
```bash
python app.py
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install frontend dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

- `GET /` - Home endpoint
- `POST /api/upload` - Basic font analysis
- `POST /api/fonts/advanced` - Advanced font analysis
- `GET /api/health` - Health check

## Technologies Used

- **Backend**: Flask, pdfplumber, pdfminer.six
- **Frontend**: React, React Bootstrap, Axios
- **Deployment**: Ready for deployment on platforms like Heroku, Vercel, etc.

## Usage

1. Upload a PDF file using the drag-and-drop interface
2. Click "Basic Analysis" or "Advanced Analysis" to process the file
3. View font information including names, sizes, and usage statistics