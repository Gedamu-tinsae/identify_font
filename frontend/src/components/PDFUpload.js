import React from 'react';
import { Card, Alert, ProgressBar } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { isValidPDF, formatFileSize } from '../utils/helpers';

const PDFUpload = ({ 
  pdfFile, 
  setPdfFile, 
  uploadProgress, 
  loading, 
  error, 
  setError 
}) => {
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (isValidPDF(file)) {
        setPdfFile(file);
      } else {
        setError('Please upload a PDF file');
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false
  });

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Select PDF File</Card.Title>
        <div 
          {...getRootProps()}
          className={`dropzone border rounded p-5 text-center ${isDragActive ? 'border-primary bg-light' : ''}`}
          style={{ cursor: 'pointer' }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="mb-0">Drop the PDF file here...</p>
          ) : (
            <p className="mb-0">
              Drag & drop a PDF file here, or click to browse
            </p>
          )}
        </div>
        
        {pdfFile && (
          <div className="mt-3">
            <Alert variant="info">
              Selected file: <strong>{pdfFile.name}</strong> ({formatFileSize(pdfFile.size)} MB)
            </Alert>
          </div>
        )}

        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="mt-3">
            <ProgressBar 
              animated 
              now={uploadProgress} 
              label={`${uploadProgress}%`} 
            />
          </div>
        )}

        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default PDFUpload;