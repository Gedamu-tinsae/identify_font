// API base URL
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// File validation
export const isValidPDF = (file) => {
  return file && 
         (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf'));
};

// File size formatting
export const formatFileSize = (sizeInBytes) => {
  const sizeInMB = sizeInBytes / (1024 * 1024);
  return sizeInMB.toFixed(2);
};

// Page name formatting
export const formatPageName = (pageKey) => {
  return pageKey.replace('_', ' ').toUpperCase();
};

// Color formatting
export const formatColor = (color) => {
  if (Array.isArray(color)) {
    return color.join(',');
  }
  return color;
};