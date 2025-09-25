// src/components/PDFViewer/PDFCanvas.jsx
import React, { useRef, useEffect } from 'react';
import { renderPdfPage } from './utils/pdfRenderer';

const PDFCanvas = ({ pdfDoc, pageNum, loading, setLoading, onError, styles }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (pdfDoc && pageNum) {
      renderPage();
    }
  }, [pdfDoc, pageNum]);

  const renderPage = async () => {
    if (!pdfDoc) return;
    
    try {
      setLoading(true);
      await renderPdfPage(pdfDoc, pageNum, canvasRef.current);
      setLoading(false);
    } catch (err) {
      onError(`Failed to render page: ${err.message}`);
      setLoading(false);
    }
  };

  return (
    <div style={styles.canvasContainer}>
      {loading && (
        <div style={styles.loading}>Loading...</div>
      )}
      
      {!pdfDoc && !loading && (
        <div style={styles.placeholder}>
          Select a PDF file to view
        </div>
      )}
      
      <canvas
        ref={canvasRef}
        style={{
          ...styles.canvas,
          display: pdfDoc && !loading ? 'block' : 'none'
        }}
      />
    </div>
  );
};

export default PDFCanvas;