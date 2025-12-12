import React from 'react';
import { Button } from 'react-bootstrap';

const AnalysisButtons = ({ 
  pdfFile, 
  loading, 
  handleAnalyze, 
  handleAdvancedAnalyze, 
  handleClear 
}) => {
  return (
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
        onClick={handleClear}
      >
        Clear
      </Button>
    </div>
  );
};

export default AnalysisButtons;