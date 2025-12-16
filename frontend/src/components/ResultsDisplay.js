import React from 'react';
import { Card, Alert, Table, ListGroup } from 'react-bootstrap';
import { formatPageName, formatColor } from '../utils/helpers';
import { FiFileText, FiInfo, FiBarChart2, FiType, FiAlertTriangle, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import styles from './ResultsDisplay.module.css';

const ResultsDisplay = ({ analysisResult }) => {
  if (!analysisResult) return null;

  // Check if this is an OCR result
  if (analysisResult.ocr_analysis) {
    const { ocr_analysis } = analysisResult;

    if (ocr_analysis.error) {
      return (
        <Card className="mb-4 shadow-sm" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
          <Card.Header className="d-flex align-items-center" style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}>
            <FiFileText className="me-2" style={{ color: 'var(--accent-primary)' }} />
            <h5 className="mb-0" style={{ color: 'var(--text-primary)' }}>OCR Text Extraction Results</h5>
          </Card.Header>
          <Card.Body style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }}>
            <p className="mb-3" style={{ color: 'var(--text-primary)' }}><strong>File:</strong> {analysisResult.filename}</p>
            <Alert variant="warning" className="d-flex align-items-center" style={{ backgroundColor: 'rgba(255, 193, 7, 0.2)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              <FiAlertTriangle className="me-2 fs-5 flex-shrink-0" style={{ color: 'var(--accent-secondary)' }} />
              <div className="text-start" style={{ color: 'var(--text-primary)' }}>{ocr_analysis.error}</div>
            </Alert>
          </Card.Body>
        </Card>
      );
    }

    return (
      <Card className="mb-4 shadow-sm" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <Card.Header className="d-flex align-items-center" style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}>
          <FiFileText className="me-2" style={{ color: 'var(--accent-primary)' }} />
          <h5 className="mb-0" style={{ color: 'var(--text-primary)' }}>OCR Text Extraction Results</h5>
        </Card.Header>
        <Card.Body style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }}>
          <p className="mb-3" style={{ color: 'var(--text-primary)' }}><strong>File:</strong> {analysisResult.filename}</p>
          <div>
            <h6 className="d-flex align-items-center mb-3" style={{ color: 'var(--text-primary)' }}>
              <FiFileText className="me-2" style={{ color: 'var(--accent-primary)' }} />
              Extracted Text from Images
            </h6>
            {ocr_analysis.ocr_results && ocr_analysis.ocr_results.length > 0 ? (
              <div className="mt-3">
                {ocr_analysis.ocr_results.map((result, index) => (
                  <div key={index} className="mb-4 border rounded-3 p-3" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
                    <h6 className="d-flex align-items-center" style={{ color: 'var(--text-primary)' }}>
                      <FiCheckCircle className="me-2" style={{ color: 'var(--accent-secondary)' }} />
                      Page {result.page}
                    </h6>
                    {result.extracted_text ? (
                      <ListGroup className="mt-2">
                        <ListGroup.Item style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
                          <pre style={{
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word',
                            maxHeight: '300px',
                            overflowY: 'auto',
                            backgroundColor: 'var(--bg-tertiary)',
                            color: 'var(--text-primary)',
                            padding: '1rem',
                            borderRadius: '8px',
                            border: '1px solid var(--border)'
                          }}>
                            {result.extracted_text}
                          </pre>
                        </ListGroup.Item>
                      </ListGroup>
                    ) : (
                      <div className="d-flex align-items-center" style={{ color: 'var(--text-secondary)' }}>
                        <FiXCircle className="me-2" style={{ color: 'var(--error)' }} />
                        <p className="mb-0">No text extracted from this page</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="d-flex align-items-center justify-content-center p-4 rounded-3" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
                <FiXCircle className="me-2" style={{ color: 'var(--error)' }} />
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
    <Card className={`${styles.resultCard} mb-4 shadow-sm`} style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
      <Card.Header className={`${styles.resultCardHeader} d-flex align-items-center`} style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}>
        <FiInfo className="me-2" style={{ color: 'var(--accent-primary)' }} />
        <h5 className="mb-0" style={{ color: 'var(--text-primary)' }}>Analysis Results</h5>
      </Card.Header>
      <Card.Body style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }}>
        <p className="mb-3" style={{ color: 'var(--text-primary)' }}><strong>File:</strong> {analysisResult.filename}</p>

        {analysisResult.font_analysis && (
          <div>
            {analysisResult.font_analysis.basic_info && (
              <div className="mb-4">
                <h6 className="d-flex align-items-center mb-3" style={{ color: 'var(--text-primary)' }}>
                  <FiInfo className="me-2" style={{ color: 'var(--accent-primary)' }} />
                  Basic Font Information
                </h6>
                <ListGroup className="shadow-sm" style={{ backgroundColor: 'var(--surface)' }}>
                  {analysisResult.font_analysis.basic_info.map((font, index) => (
                    <ListGroup.Item key={index} className="d-flex flex-column flex-md-row justify-content-between align-items-start" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
                      <div className="d-flex align-items-center">
                        <FiType className="me-2 flex-shrink-0" style={{ color: 'var(--accent-primary)' }} />
                        <div className="text-start">
                          <strong style={{ color: 'var(--text-primary)' }}>Name:</strong> {font.name}
                        </div>
                      </div>
                      <div className="text-start" style={{ color: 'var(--text-primary)' }}>
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
                <h6 className="d-flex align-items-center mb-3" style={{ color: 'var(--text-primary)' }}>
                  <FiBarChart2 className="me-2" style={{ color: 'var(--accent-primary)' }} />
                  Font Usage Statistics
                </h6>
                <div className="table-responsive">
                  <Table striped bordered hover className="shadow-sm" style={{ backgroundColor: 'var(--surface)' }}>
                    <thead>
                      <tr style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                        <th style={{ color: 'var(--text-primary)' }}>Font Name</th>
                        <th style={{ color: 'var(--text-primary)' }}>Size</th>
                        <th style={{ color: 'var(--text-primary)' }}>Usage Count</th>
                        <th style={{ color: 'var(--text-primary)' }}>Pages Used</th>
                      </tr>
                    </thead>
                    <tbody style={{ color: 'var(--text-primary)' }}>
                      {Object.entries(analysisResult.font_analysis.statistics).map(([key, stat]) => (
                        <tr key={key} style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                          <td style={{ color: 'var(--text-primary)' }}><strong>{stat.font_name}</strong></td>
                          <td style={{ color: 'var(--text-primary)' }}>{stat.font_size}</td>
                          <td style={{ color: 'var(--text-primary)' }}>{stat.usage_count}</td>
                          <td style={{ color: 'var(--text-primary)' }}>{stat.pages_used.join(', ')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            )}

            {analysisResult.font_analysis.by_page && Object.keys(analysisResult.font_analysis.by_page).length > 0 && (
              <div>
                <h6 className="d-flex align-items-center mb-3" style={{ color: 'var(--text-primary)' }}>
                  <FiType className="me-2" style={{ color: 'var(--accent-primary)' }} />
                  Fonts by Page
                </h6>
                {Object.entries(analysisResult.font_analysis.by_page).map(([pageKey, pageInfo]) => (
                  <div key={pageKey} className="mb-4 border rounded-3 p-3" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border)' }}>
                    <h6 className="d-flex align-items-center mb-3" style={{ color: 'var(--text-primary)' }}>
                      <FiType className="me-2" style={{ color: 'var(--accent-primary)' }} />
                      {formatPageName(pageKey)}
                    </h6>
                    {pageInfo.fonts && pageInfo.fonts.length > 0 ? (
                      <ListGroup className="mb-2" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                        {pageInfo.fonts.slice(0, 10).map((font, idx) => (
                          <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
                            <div className="text-start" style={{ color: 'var(--text-primary)' }}>
                              {font.name} (Size: {font.size}, Color: {formatColor(font.color)})
                            </div>
                            <div className="d-flex">
                              <span className="badge me-1" style={{ backgroundColor: 'var(--accent-primary)', color: 'white' }}>{font.size}px</span>
                              <span className="badge" style={{ backgroundColor: 'var(--accent-secondary)', color: 'white' }}>Pg {font.page || 'N/A'}</span>
                            </div>
                          </ListGroup.Item>
                        ))}
                        {pageInfo.fonts.length > 10 && (
                          <ListGroup.Item className="d-flex justify-content-between align-items-center" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                            <div className="text-start" style={{ color: 'var(--text-secondary)' }}>
                              ... and {pageInfo.fonts.length - 10} more fonts
                            </div>
                            <span className="badge" style={{ backgroundColor: 'var(--accent-secondary)', color: 'white' }}>{pageInfo.fonts.length - 10}+</span>
                          </ListGroup.Item>
                        )}
                      </ListGroup>
                    ) : (
                      <div className="d-flex align-items-center" style={{ color: 'var(--text-secondary)' }}>
                        <FiXCircle className="me-2" style={{ color: 'var(--error)' }} />
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
            <h6 className="d-flex align-items-center mb-3" style={{ color: 'var(--text-primary)' }}>
              <FiType className="me-2" style={{ color: 'var(--accent-primary)' }} />
              Detected Fonts
            </h6>
            {analysisResult.font_analysis.length > 0 ? (
              <ListGroup className="shadow-sm" style={{ backgroundColor: 'var(--surface)' }}>
                {analysisResult.font_analysis.map((font, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
                    <div className="text-start" style={{ color: 'var(--text-primary)' }}>
                      <strong>Name:</strong> {font.name} |
                      <strong> Size:</strong> {font.size} |
                      <strong> Page:</strong> {font.page}
                    </div>
                    <div className="d-flex">
                      <span className="badge me-2" style={{ backgroundColor: 'var(--accent-primary)', color: 'white' }}>{font.size}px</span>
                      <span className="badge" style={{ backgroundColor: 'var(--accent-secondary)', color: 'white' }}>Pg {font.page}</span>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <div className="d-flex align-items-center justify-content-center p-4 rounded-3" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
                <FiXCircle className="me-2" style={{ color: 'var(--error)' }} />
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