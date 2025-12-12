import React from 'react';
import { Card, Alert, Table, ListGroup } from 'react-bootstrap';
import { formatPageName, formatColor } from '../utils/helpers';

const ResultsDisplay = ({ analysisResult }) => {
  if (!analysisResult) return null;

  // Check if this is an OCR result
  if (analysisResult.ocr_analysis) {
    const { ocr_analysis } = analysisResult;

    if (ocr_analysis.error) {
      return (
        <Card className="mb-4">
          <Card.Header>
            <h5>OCR Text Extraction Results</h5>
          </Card.Header>
          <Card.Body>
            <Alert variant="warning">
              {ocr_analysis.error}
            </Alert>
          </Card.Body>
        </Card>
      );
    }

    return (
      <Card className="mb-4">
        <Card.Header>
          <h5>OCR Text Extraction Results</h5>
        </Card.Header>
        <Card.Body>
          <p><strong>File:</strong> {analysisResult.filename}</p>
          <div>
            <h6>Extracted Text from Images</h6>
            {ocr_analysis.ocr_results && ocr_analysis.ocr_results.length > 0 ? (
              <div>
                {ocr_analysis.ocr_results.map((result, index) => (
                  <div key={index} className="mb-3">
                    <h6>Page {result.page}</h6>
                    {result.extracted_text ? (
                      <ListGroup>
                        <ListGroup.Item>
                          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                            {result.extracted_text}
                          </pre>
                        </ListGroup.Item>
                      </ListGroup>
                    ) : (
                      <p className="text-muted">No text extracted from this page</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>No text could be extracted from images in the PDF</p>
            )}
          </div>
        </Card.Body>
      </Card>
    );
  }

  // Handle font analysis results
  return (
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
                <ListGroup>
                  {analysisResult.font_analysis.basic_info.map((font, index) => (
                    <ListGroup.Item key={index}>
                      <strong>Name:</strong> {font.name} |
                      <strong> Subtype:</strong> {font.subtype} |
                      <strong> Base Font:</strong> {font.basefont}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            )}

            {analysisResult.font_analysis.statistics && Object.keys(analysisResult.font_analysis.statistics).length > 0 && (
              <div className="mb-3">
                <h6>Font Usage Statistics</h6>
                <Table striped bordered hover>
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
                </Table>
              </div>
            )}

            {analysisResult.font_analysis.by_page && Object.keys(analysisResult.font_analysis.by_page).length > 0 && (
              <div>
                <h6>Fonts by Page</h6>
                {Object.entries(analysisResult.font_analysis.by_page).map(([pageKey, pageInfo]) => (
                  <div key={pageKey} className="mb-3">
                    <h6>{formatPageName(pageKey)}</h6>
                    {pageInfo.fonts && pageInfo.fonts.length > 0 ? (
                      <ListGroup>
                        {pageInfo.fonts.slice(0, 10).map((font, idx) => (
                          <ListGroup.Item key={idx}>
                            {font.name} (Size: {font.size}, Color: {formatColor(font.color)})
                          </ListGroup.Item>
                        ))}
                        {pageInfo.fonts.length > 10 && (
                          <ListGroup.Item className="text-muted">
                            ... and {pageInfo.fonts.length - 10} more fonts
                          </ListGroup.Item>
                        )}
                      </ListGroup>
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
              <ListGroup>
                {analysisResult.font_analysis.map((font, index) => (
                  <ListGroup.Item key={index}>
                    <strong>Name:</strong> {font.name} |
                    <strong> Size:</strong> {font.size} |
                    <strong> Page:</strong> {font.page}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <p>No fonts detected in the PDF</p>
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ResultsDisplay;