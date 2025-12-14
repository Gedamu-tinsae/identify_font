import React from 'react';
import { Button } from 'react-bootstrap';
import { FiCpu, FiBarChart2, FiSettings, FiEye, FiRefreshCw } from 'react-icons/fi';
import styles from './AnalysisButtons.module.css';

const AnalysisButtons = ({
  pdfFile,
  loading,
  handleBasicAnalyze,
  handleAnalyze,
  handleAdvancedAnalyze,
  handleOCRAnalyze,
  handleClear
}) => {
  return (
    <div className={`${styles.buttonGroup} d-grid gap-3 d-md-flex justify-content-md-center mt-4`}>
      <Button
        variant="primary"
        onClick={handleBasicAnalyze}
        disabled={!pdfFile || loading}
        className="d-flex align-items-center justify-content-center px-4 py-2"
      >
        {loading ? (
          <>
            <FiCpu className="me-2" />
            <FiRefreshCw className="me-2 spinner-icon" />
            Analyzing...
          </>
        ) : (
          <>
            <FiCpu className="me-2" />
            Basic Analysis (pdfminer)
          </>
        )}
      </Button>

      <Button
        variant="primary"
        onClick={handleAnalyze}
        disabled={!pdfFile || loading}
        className="d-flex align-items-center justify-content-center px-4 py-2"
      >
        {loading ? (
          <>
            <FiBarChart2 className="me-2" />
            <FiRefreshCw className="me-2 spinner-icon" />
            Analyzing...
          </>
        ) : (
          <>
            <FiBarChart2 className="me-2" />
            Detailed Analysis (pdfplumber)
          </>
        )}
      </Button>

      <Button
        variant="secondary"
        onClick={handleAdvancedAnalyze}
        disabled={!pdfFile || loading}
        className="d-flex align-items-center justify-content-center px-4 py-2"
      >
        {loading ? (
          <>
            <FiSettings className="me-2" />
            <FiRefreshCw className="me-2 spinner-icon" />
            Analyzing...
          </>
        ) : (
          <>
            <FiSettings className="me-2" />
            Advanced Analysis
          </>
        )}
      </Button>

      <Button
        variant="info"
        onClick={handleOCRAnalyze}
        disabled={!pdfFile || loading}
        className="d-flex align-items-center justify-content-center px-4 py-2"
      >
        {loading ? (
          <>
            <FiEye className="me-2" />
            <FiRefreshCw className="me-2 spinner-icon" />
            Analyzing...
          </>
        ) : (
          <>
            <FiEye className="me-2" />
            OCR Analysis
          </>
        )}
      </Button>

      <Button
        variant="outline-secondary"
        onClick={handleClear}
        className="d-flex align-items-center justify-content-center px-4 py-2"
      >
        <FiRefreshCw className="me-2" />
        Clear
      </Button>
    </div>
  );
};

export default AnalysisButtons;