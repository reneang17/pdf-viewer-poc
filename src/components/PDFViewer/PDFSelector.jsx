// src/components/PDFViewer/PDFSelector.jsx
import React, { useState, useEffect } from 'react';
import { fetchPDFsFromAPI, loadPdfFromUrl } from './utils/pdfApiLoader';

const PDFSelector = ({ onFileLoad, onError, setLoading, styles, apiBaseUrl }) => {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdfId, setSelectedPdfId] = useState('');
  const [loadingPdfs, setLoadingPdfs] = useState(false);

  useEffect(() => {
    loadPDFs();
  }, []);

  const loadPDFs = async () => {
    setLoadingPdfs(true);
    try {
      const pdfList = await fetchPDFsFromAPI(apiBaseUrl);
      setPdfs(pdfList);
    } catch (err) {
      onError(`Failed to load PDFs: ${err.message}`);
    } finally {
      setLoadingPdfs(false);
    }
  };

  const handlePDFSelect = async (e) => {
    const pdfId = e.target.value;
    setSelectedPdfId(pdfId);
    
    if (!pdfId) return;

    setLoading(true);
    onError(null);

    try {
      const pdfDoc = await loadPdfFromUrl(pdfId, apiBaseUrl);
      onFileLoad(pdfDoc);
    } catch (err) {
      onError(`Failed to load PDF: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pdfSelector}>
      <label style={styles.label}>Select PDF from API:</label>
      <select
        value={selectedPdfId}
        onChange={handlePDFSelect}
        style={styles.select}
        disabled={loadingPdfs}
      >
        <option value="">{loadingPdfs ? 'Loading PDFs...' : 'Choose a PDF'}</option>
        {pdfs.map((pdf) => (
          <option key={pdf.id} value={pdf.id}>
            {pdf.title} ({pdf.filename})
          </option>
        ))}
      </select>
    </div>
  );
};

export default PDFSelector;
