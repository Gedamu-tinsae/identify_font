import React, { useState } from 'react';
import { useTheme } from './context/ThemeContext';
import styles from './styles/App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FiSun, FiMoon } from 'react-icons/fi';
import axios from 'axios';
import { API_BASE_URL } from './utils/helpers';
import PDFUpload from './components/PDFUpload';
import AnalysisButtons from './components/AnalysisButtons';
import ResultsDisplay from './components/ResultsDisplay';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [pdfFile, setPdfFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleBasicAnalyze = async () => {
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

      const response = await axios.post(`${API_BASE_URL}/api/fonts/basic`, formData, {
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
      console.error('Basic analysis error:', err);
      setError(err.response?.data?.error || 'Failed to analyze PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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

  const handleOCRAnalyze = async () => {
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

      const response = await axios.post(`${API_BASE_URL}/api/fonts/ocr`, formData, {
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
      console.error('OCR analysis error:', err);
      setError(err.response?.data?.error || 'Failed to analyze PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPdfFile(null);
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <div className={styles.app}>
      <Container className={styles.container}>
        <Row className="position-relative mb-4">
          <Col className="d-flex flex-column align-items-center">
            <div className="text-center mb-3">
              <h1 className={styles.title}>PDF Font Identifier</h1>
              <p className={styles.description}>
                Upload a PDF file to identify fonts used in the document
              </p>
            </div>
          </Col>
          <div className="position-absolute top-0 end-0 p-2">
            <Button
              variant="link"
              onClick={toggleTheme}
              className="p-0 border-0 d-flex align-items-center justify-content-center"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              style={{
                color: theme === 'dark' ? 'var(--accent-primary)' : 'var(--accent-primary)',
                backgroundColor: 'transparent',
                width: '40px',
                height: '40px',
                borderRadius: '50%'
              }}
            >
              {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
            </Button>
          </div>
        </Row>

        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <PDFUpload
              pdfFile={pdfFile}
              setPdfFile={setPdfFile}
              uploadProgress={uploadProgress}
              loading={loading}
              error={error}
              setError={setError}
            />

            <AnalysisButtons
              pdfFile={pdfFile}
              loading={loading}
              handleBasicAnalyze={handleBasicAnalyze}
              handleAnalyze={handleAnalyze}
              handleAdvancedAnalyze={handleAdvancedAnalyze}
              handleOCRAnalyze={handleOCRAnalyze}
              handleClear={handleClear}
            />

            {analysisResult && (
            <div className="fade-in">
              <ResultsDisplay analysisResult={analysisResult} />
            </div>
          )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;