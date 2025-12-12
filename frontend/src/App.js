import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Alert, ProgressBar } from 'react-bootstrap';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        setPdfFile(file);
        setAnalysisResult(null);
        setError(null);
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

  const handleAnalyze = async () => {
    if (!pdfFile) {
      setError('Please select a PDF file first');
      return;
    }

    setLoading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('pdf_file', pdfFile);

      const response = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        }
      });

      setAnalysisResult(response.data);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.response?.data?.error || 'Failed to analyze PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdvancedAnalyze = async () => {
    if (!pdfFile) {
      setError('Please select a PDF file first');
      return;
    }

    setLoading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('pdf_file', pdfFile);

      const response = await axios.post(`${API_BASE_URL}/api/fonts/advanced`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        }
      });

      setAnalysisResult(response.data);
    } catch (err) {
      console.error('Advanced analysis error:', err);
      setError(err.response?.data?.error || 'Failed to analyze PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Container className="py-5">
        <Row className="mb-4">
          <Col>
            <h1 className="text-center mb-4">PDF Font Identifier</h1>
            <p className="text-center text-muted">
              Upload a PDF file to identify fonts used in the document
            </p>
          </Col>
        </Row>

        <Row>
          <Col md={{ span: 8, offset: 2 }}>
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
                      Selected file: <strong>{pdfFile.name}</strong> ({(pdfFile.size / 1024 / 1024).toFixed(2)} MB)
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

                <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-3">
                  <Button 
                    variant="primary" 
                    onClick={handleAnalyze} 
                    disabled={!pdfFile || loading}
                  >
                    {loading ? 'Analyzing...' : 'Basic Analysis'}
                  </Button>
                  <Button 
                    variant="secondary" 
                    onClick={handleAdvancedAnalyze} 
                    disabled={!pdfFile || loading}
                  >
                    {loading ? 'Analyzing...' : 'Advanced Analysis'}
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => {
                      setPdfFile(null);
                      setAnalysisResult(null);
                      setError(null);
                    }}
                  >
                    Clear
                  </Button>
                </div>

                {error && (
                  <Alert variant="danger" className="mt-3">
                    {error}
                  </Alert>
                )}
              </Card.Body>
            </Card>

            {analysisResult && (
              <Card className="mb-4">
                <Card.Header>
                  <h5>Analysis Results</h5>
                </Card.Header>
                <Card.Body>
                  <p><strong>File:</strong> {analysisResult.filename}</p>
                  
                  {analysisResult.font_analysis && (
                    <div>
                      {analysisResult.font_analysis.basic_info && (
                        <div className="mb-3">
                          <h6>Basic Font Information</h6>
                          <ul className="list-group">
                            {analysisResult.font_analysis.basic_info.map((font, index) => (
                              <li key={index} className="list-group-item">
                                <strong>Name:</strong> {font.name} | 
                                <strong> Subtype:</strong> {font.subtype} | 
                                <strong> Base Font:</strong> {font.basefont}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {analysisResult.font_analysis.statistics && Object.keys(analysisResult.font_analysis.statistics).length > 0 && (
                        <div className="mb-3">
                          <h6>Font Usage Statistics</h6>
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th>Font Name</th>
                                <th>Size</th>
                                <th>Usage Count</th>
                                <th>Pages Used</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Object.entries(analysisResult.font_analysis.statistics).map(([key, stat]) => (
                                <tr key={key}>
                                  <td>{stat.font_name}</td>
                                  <td>{stat.font_size}</td>
                                  <td>{stat.usage_count}</td>
                                  <td>{stat.pages_used.join(', ')}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {analysisResult.font_analysis.by_page && Object.keys(analysisResult.font_analysis.by_page).length > 0 && (
                        <div>
                          <h6>Fonts by Page</h6>
                          {Object.entries(analysisResult.font_analysis.by_page).map(([pageKey, pageInfo]) => (
                            <div key={pageKey} className="mb-3">
                              <h6>{pageKey.replace('_', ' ').toUpperCase()}</h6>
                              {pageInfo.fonts && pageInfo.fonts.length > 0 ? (
                                <ul className="list-group">
                                  {pageInfo.fonts.slice(0, 10).map((font, idx) => (
                                    <li key={idx} className="list-group-item">
                                      {font.name} (Size: {font.size}, Color: {Array.isArray(font.color) ? font.color.join(',') : font.color})
                                    </li>
                                  ))}
                                  {pageInfo.fonts.length > 10 && (
                                    <li className="list-group-item text-muted">
                                      ... and {pageInfo.fonts.length - 10} more fonts
                                    </li>
                                  )}
                                </ul>
                              ) : (
                                <p>No fonts detected on this page</p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* For basic analysis */}
                  {Array.isArray(analysisResult.font_analysis) && (
                    <div>
                      <h6>Detected Fonts</h6>
                      {analysisResult.font_analysis.length > 0 ? (
                        <ul className="list-group">
                          {analysisResult.font_analysis.map((font, index) => (
                            <li key={index} className="list-group-item">
                              <strong>Name:</strong> {font.name} | 
                              <strong> Size:</strong> {font.size} | 
                              <strong> Page:</strong> {font.page}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No fonts detected in the PDF</p>
                      )}
                    </div>
                  )}
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;