import React from 'react';
import { Card, Alert, ProgressBar } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { isValidPDF, formatFileSize } from '../utils/helpers';
import { FiUpload, FiFile, FiCheck, FiAlertCircle } from 'react-icons/fi';
import styles from './PDFUpload.module.css';

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
        <Card.Title className="d-flex align-items-center justify-content-center mb-4">
          <FiUpload className="me-2" /> Select PDF File
        </Card.Title>
        <div
          {...getRootProps()}
          className={`${styles.dropzone} border-3 rounded-4 p-5 text-center ${isDragActive ? styles.dropzoneBorderPrimary : ''}`}
          style={{ cursor: 'pointer', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <input {...getInputProps()} />
          <div className="d-flex flex-column align-items-center">
            <FiUpload size={48} className={`mb-3 ${isDragActive ? 'text-primary' : 'text-muted'}`} />
            {isDragActive ? (
              <p className="mb-0 fs-5 fw-bold text-primary">
                Drop the PDF file here...
              </p>
            ) : (
              <p className="mb-0 fs-5">
                <span className="fw-bold">Drag & drop</span> a PDF file here, or <span className="fw-bold text-primary">click to browse</span>
              </p>
            )}
          </div>
        </div>

        {pdfFile && (
          <div className="mt-4">
            <Alert variant="info" className="d-flex align-items-center">
              <FiFile className="me-2 fs-5" />
              <div className="flex-grow-1 text-start">
                <strong className="me-2">{pdfFile.name}</strong>
                <small>({formatFileSize(pdfFile.size)} MB)</small>
              </div>
              <FiCheck className="text-success fs-5" />
            </Alert>
          </div>
        )}

        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="mt-4">
            <div className="d-flex justify-content-between mb-1">
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
          <Alert variant="danger" className="mt-4 d-flex align-items-center">
            <FiAlertCircle className="me-2 fs-5" />
            <div className="text-start">{error}</div>
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default PDFUpload;