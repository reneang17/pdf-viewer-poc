// src/components/PDFViewer/FileUploader.jsx
import React, { useRef } from 'react';
import { loadPdfFromFile } from './utils/pdfLoader';

const FileUploader = ({ onFileLoad, onError, setLoading, styles }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (file.type !== 'application/pdf') {
      onError('Please select a valid PDF file');
      return;
    }
    
    setLoading(true);
    onError(null);
    
    try {
      const pdfDoc = await loadPdfFromFile(file);
      onFileLoad(pdfDoc);
    } catch (err) {
      onError(`Failed to load PDF: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.fileInput}>
      <label style={styles.label}>Select PDF:</label>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFileSelect}
        style={styles.input}
      />
    </div>
  );
};

export default FileUploader;