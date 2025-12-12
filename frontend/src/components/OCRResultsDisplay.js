import React from 'react';
import { Card, Alert, Table, ListGroup } from 'react-bootstrap';

const OCRResultsDisplay = ({ ocrResult }) => {
  if (!ocrResult || !ocrResult.ocr_analysis) return null;

  const { ocr_analysis } = ocrResult;
  
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
};

export default OCRResultsDisplay;