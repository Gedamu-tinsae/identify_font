import React from 'react';
import { Card, Alert, Table, ListGroup } from 'react-bootstrap';
import { formatPageName, formatColor } from '../utils/helpers';
import { FiFileText, FiInfo, FiBarChart2, FiType, FiAlertTriangle, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const ResultsDisplay = ({ analysisResult }) => {
  if (!analysisResult) return null;

  // Check if this is an OCR result
  if (analysisResult.ocr_analysis) {
    const { ocr_analysis } = analysisResult;

    if (ocr_analysis.error) {
      return (
        <Card className="mb-4 shadow-sm">
          <Card.Header className="d-flex align-items-center">
            <FiFileText className="me-2" />
            <h5 className="mb-0">OCR Text Extraction Results</h5>
          </Card.Header>
          <Card.Body>
            <p className="mb-3"><strong>File:</strong> {analysisResult.filename}</p>
            <Alert variant="warning" className="d-flex align-items-center">
              <FiAlertTriangle className="me-2 fs-5 flex-shrink-0" />
              <div className="text-start">{ocr_analysis.error}</div>
            </Alert>
          </Card.Body>
        </Card>
      );
    }

    return (
      <Card className="mb-4 shadow-sm">
        <Card.Header className="d-flex align-items-center">
          <FiFileText className="me-2" />
          <h5 className="mb-0">OCR Text Extraction Results</h5>
        </Card.Header>
        <Card.Body>
          <p className="mb-3"><strong>File:</strong> {analysisResult.filename}</p>
          <div>
            <h6 className="d-flex align-items-center mb-3">
              <FiFileText className="me-2 text-primary" />
              Extracted Text from Images
            </h6>
            {ocr_analysis.ocr_results && ocr_analysis.ocr_results.length > 0 ? (
              <div className="mt-3">
                {ocr_analysis.ocr_results.map((result, index) => (
                  <div key={index} className="mb-4 border rounded-3 p-3 bg-light">
                    <h6 className="d-flex align-items-center">
                      <FiCheckCircle className="me-2 text-success" />
                      Page {result.page}
                    </h6>
                    {result.extracted_text ? (
                      <ListGroup className="mt-2">
                        <ListGroup.Item className="bg-white">
                          <pre style={{
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word',
                            maxHeight: '300px',
                            overflowY: 'auto',
                            backgroundColor: '#f8f9fa',
                            padding: '1rem',
                            borderRadius: '8px',
                            border: '1px solid #e9ecef'
                          }}>
                            {result.extracted_text}
                          </pre>
                        </ListGroup.Item>
                      </ListGroup>
                    ) : (
                      <div className="d-flex align-items-center text-muted">
                        <FiXCircle className="me-2 text-danger" />
                        <p className="mb-0">No text extracted from this page</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="d-flex align-items-center justify-content-center p-4 bg-light rounded-3">
                <FiXCircle className="me-2 text-danger" />
                <p className="mb-0">No text could be extracted from images in the PDF</p>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    );
  }

  // Handle font analysis results
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header className="d-flex align-items-center">
        <FiInfo className="me-2" />
        <h5 className="mb-0">Analysis Results</h5>
      </Card.Header>
      <Card.Body>
        <p className="mb-3"><strong>File:</strong> {analysisResult.filename}</p>

        {analysisResult.font_analysis && (
          <div>
            {analysisResult.font_analysis.basic_info && (
              <div className="mb-4">
                <h6 className="d-flex align-items-center mb-3">
                  <FiInfo className="me-2 text-primary" />
                  Basic Font Information
                </h6>
                <ListGroup className="shadow-sm">
                  {analysisResult.font_analysis.basic_info.map((font, index) => (
                    <ListGroup.Item key={index} className="d-flex flex-column flex-md-row justify-content-between align-items-start">
                      <div className="d-flex align-items-center">
                        <FiType className="me-2 text-primary flex-shrink-0" />
                        <div className="text-start">
                          <strong>Name:</strong> {font.name}
                        </div>
                      </div>
                      <div className="text-start">
                        <strong>Subtype:</strong> {font.subtype} |
                        <strong> Base Font:</strong> {font.basefont}
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            )}

            {analysisResult.font_analysis.statistics && Object.keys(analysisResult.font_analysis.statistics).length > 0 && (
              <div className="mb-4">
                <h6 className="d-flex align-items-center mb-3">
                  <FiBarChart2 className="me-2 text-primary" />
                  Font Usage Statistics
                </h6>
                <div className="table-responsive">
                  <Table striped bordered hover className="shadow-sm">
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
                          <td><strong>{stat.font_name}</strong></td>
                          <td>{stat.font_size}</td>
                          <td>{stat.usage_count}</td>
                          <td>{stat.pages_used.join(', ')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            )}

            {analysisResult.font_analysis.by_page && Object.keys(analysisResult.font_analysis.by_page).length > 0 && (
              <div>
                <h6 className="d-flex align-items-center mb-3">
                  <FiType className="me-2 text-primary" />
                  Fonts by Page
                </h6>
                {Object.entries(analysisResult.font_analysis.by_page).map(([pageKey, pageInfo]) => (
                  <div key={pageKey} className="mb-4 border rounded-3 p-3 bg-light">
                    <h6 className="d-flex align-items-center mb-3">
                      <FiType className="me-2 text-primary" />
                      {formatPageName(pageKey)}
                    </h6>
                    {pageInfo.fonts && pageInfo.fonts.length > 0 ? (
                      <ListGroup className="mb-2">
                        {pageInfo.fonts.slice(0, 10).map((font, idx) => (
                          <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center">
                            <div className="text-start">
                              {font.name} (Size: {font.size}, Color: {formatColor(font.color)})
                            </div>
                            <div className="d-flex">
                              <span className="badge bg-primary me-1">{font.size}px</span>
                              <span className="badge bg-secondary">Pg {font.page || 'N/A'}</span>
                            </div>
                          </ListGroup.Item>
                        ))}
                        {pageInfo.fonts.length > 10 && (
                          <ListGroup.Item className="d-flex justify-content-between align-items-center">
                            <div className="text-muted">
                              ... and {pageInfo.fonts.length - 10} more fonts
                            </div>
                            <span className="badge bg-info">{pageInfo.fonts.length - 10}+</span>
                          </ListGroup.Item>
                        )}
                      </ListGroup>
                    ) : (
                      <div className="d-flex align-items-center text-muted">
                        <FiXCircle className="me-2 text-danger" />
                        <p className="mb-0">No fonts detected on this page</p>
                      </div>
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
            <h6 className="d-flex align-items-center mb-3">
              <FiType className="me-2 text-primary" />
              Detected Fonts
            </h6>
            {analysisResult.font_analysis.length > 0 ? (
              <ListGroup className="shadow-sm">
                {analysisResult.font_analysis.map((font, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                    <div className="text-start">
                      <strong>Name:</strong> {font.name} |
                      <strong> Size:</strong> {font.size} |
                      <strong> Page:</strong> {font.page}
                    </div>
                    <div className="d-flex">
                      <span className="badge bg-primary me-2">{font.size}px</span>
                      <span className="badge bg-secondary">Pg {font.page}</span>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <div className="d-flex align-items-center justify-content-center p-4 bg-light rounded-3">
                <FiXCircle className="me-2 text-danger" />
                <p className="mb-0">No fonts detected in the PDF</p>
              </div>
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ResultsDisplay;