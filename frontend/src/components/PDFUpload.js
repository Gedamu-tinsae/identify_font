import React from 'react';
import { Card, Alert, ProgressBar } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { isValidPDF, formatFileSize } from '../utils/helpers';
import { FiUpload, FiFile, FiCheck, FiAlertCircle } from 'react-icons/fi';
import styles from './PDFUpload.module.css';
import PDFPreview from './PDFPreview';

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
        setError(null); // Clear any previous errors when a new file is selected
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
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title className="d-flex align-items-center justify-content-center mb-4" style={{ color: 'var(--text-primary)' }}>
          <FiUpload className="me-2" style={{ color: 'var(--accent-primary)' }} /> Select PDF File
        </Card.Title>
        <div
          {...getRootProps()}
          className={`${styles.dropzone} border-3 rounded-4 p-5 text-center ${isDragActive ? styles.dropzoneBorderPrimary : ''}`}
          style={{ cursor: 'pointer', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <input {...getInputProps()} />
          <div className="d-flex flex-column align-items-center">
            <FiUpload size={48} className="mb-3" style={{ color: isDragActive ? 'var(--accent-primary)' : 'var(--text-secondary)' }} />
            {isDragActive ? (
              <p className="mb-0 fs-5 fw-bold" style={{ color: 'var(--accent-primary)' }}>
                Drop the PDF file here...
              </p>
            ) : (
              <p className="mb-0 fs-5" style={{ color: 'var(--text-primary)' }}>
                <span className="fw-bold">Drag & drop</span> a PDF file here, or <span className="fw-bold" style={{ color: 'var(--accent-primary)' }}>click to browse</span>
              </p>
            )}
          </div>
        </div>

        {pdfFile && (
          <div className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="flex-grow-1" style={{ color: 'var(--text-primary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>{pdfFile.name}</strong>
                <small className="ms-2" style={{ color: 'var(--text-secondary)' }}>({formatFileSize(pdfFile.size)} MB)</small>
              </div>
              <div>
                <FiCheck className="fs-5 me-2" style={{ color: 'var(--accent-secondary)' }} />
                <small style={{ color: 'var(--text-secondary)' }}>Ready for analysis</small>
              </div>
            </div>

            <div style={{
              border: '1px solid var(--border)',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-tertiary)',
              padding: '15px',
              maxHeight: '500px',
              overflow: 'auto'
            }}>
              <PDFPreview file={pdfFile} onError={(error) => console.error('PDF Preview Error:', error)} />
            </div>
          </div>
        )}

        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="mt-4">
            <div className="d-flex justify-content-between mb-1" style={{ color: 'var(--text-primary)' }}>
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <ProgressBar
              animated
              now={uploadProgress}
              className="mb-3"
            />
          </div>
        )}

        {error && (
          <Alert variant="danger" className="mt-4 d-flex align-items-center" style={{ color: 'var(--text-primary)' }}>
            <FiAlertCircle className="me-2 fs-5" style={{ color: 'var(--error)' }} />
            <div className="text-start" style={{ color: 'var(--text-primary)' }}>{error}</div>
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default PDFUpload;