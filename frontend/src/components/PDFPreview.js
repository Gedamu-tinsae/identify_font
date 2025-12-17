import React, { useState, useEffect, useRef } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { FiFile, FiAlertCircle } from 'react-icons/fi';

const PDFPreview = ({ file, onError }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [previewMode, setPreviewMode] = useState('iframe'); // iframe or embed
  const [error, setError] = useState(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!file) {
      setPdfUrl(null);
      return;
    }

    let objectUrl;

    try {
      // Create an object URL for the PDF file
      objectUrl = URL.createObjectURL(file);
      setPdfUrl(objectUrl);

      // Clean up the object URL when component unmounts or file changes
      return () => {
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
        }
      };
    } catch (err) {
      console.error('Error creating object URL:', err);
      setError('Failed to create PDF preview');
      if (onError) onError(err);
    }
  }, [file, onError]);

  if (error) {
    return (
      <Alert variant="danger" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
        <FiAlertCircle className="me-2" style={{ color: 'var(--error)' }} />
        <span style={{ color: 'var(--text-primary)' }}>{error}</span>
      </Alert>
    );
  }

  if (!file) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center p-5">
        <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>No PDF file selected</p>
      </div>
    );
  }

  return (
    <div className="pdf-preview-container" style={{ 
      maxHeight: '400px', 
      overflow: 'auto', 
      padding: '10px',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      backgroundColor: 'var(--bg-tertiary)'
    }}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div style={{ color: 'var(--text-primary)' }}>
          <FiFile className="me-1" style={{ color: 'var(--accent-primary)' }} />
          <strong>PDF Preview</strong>
        </div>
        <small style={{ color: 'var(--text-secondary)' }}>First page</small>
      </div>
      
      {pdfUrl ? (
        <div style={{ 
          border: '1px solid var(--border)', 
          borderRadius: '4px',
          backgroundColor: 'white',
          height: '350px',
          overflow: 'hidden'
        }}>
          {/* Try iframe first, fallback to embed if needed */}
          {previewMode === 'iframe' ? (
            <iframe
              ref={iframeRef}
              src={pdfUrl}
              type="application/pdf"
              width="100%"
              height="100%"
              title="PDF Preview"
              style={{ border: 'none' }}
              onLoad={() => {
                // iframe loaded successfully
              }}
              onError={(e) => {
                console.error('iframe failed to load PDF:', e);
                // Try embed as fallback
                setPreviewMode('embed');
              }}
            >
              <p style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                Your browser does not support PDF previews. 
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer">Click here to view the PDF</a>
              </p>
            </iframe>
          ) : (
            <embed
              src={pdfUrl}
              type="application/pdf"
              width="100%"
              height="100%"
              style={{ border: 'none' }}
              title="PDF Preview"
            />
          )}
        </div>
      ) : (
        <div className="d-flex flex-column align-items-center justify-content-center p-5">
          <Spinner animation="border" role="status" className="mb-3">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>Preparing preview...</p>
        </div>
      )}
    </div>
  );
};

export default PDFPreview;