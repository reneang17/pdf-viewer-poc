// src/components/PDFViewer/PDFViewer.jsx
import React, { useState, useEffect } from "react";
import FileUploader from "./FileUploader";
import PDFSelector from "./PDFSelector";
import PageNavigation from "./PageNavigation";
import PDFCanvas from "./PDFCanvas";
import ErrorMessage from "./ErrorMessage";
import { loadPdfJs } from "./utils/pdfLoader";
import { defaultStyles } from "./styles/defaultStyles";

const PDFViewer = ({ styles = {}, apiBaseUrl }) => {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Merge user styles with defaults
  const mergedStyles = {
    ...defaultStyles,
    ...styles,
  };

  useEffect(() => {
    // Pre-load PDF.js library
    loadPdfJs().catch((err) => {
      setError("Failed to load PDF.js library");
    });
  }, []);

  const handleFileLoad = (loadedPdf) => {
    setPdfDoc(loadedPdf);
    setTotalPages(loadedPdf.numPages);
    setCurrentPage(1);
    setError(null);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setError(null);
    } else {
      setError(`Page must be between 1 and ${totalPages}`);
    }
  };

  return (
    <div style={mergedStyles.container}>
      <ErrorMessage error={error} styles={mergedStyles} />

      <div style={mergedStyles.controls}>
        <FileUploader
          onFileLoad={handleFileLoad}
          onError={setError}
          setLoading={setLoading}
          styles={mergedStyles}
        />

        {apiBaseUrl && (
          <PDFSelector
            onFileLoad={handleFileLoad}
            onError={setError}
            setLoading={setLoading}
            styles={mergedStyles}
            apiBaseUrl={apiBaseUrl}
          />
        )}

        {pdfDoc && (
          <PageNavigation
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            styles={mergedStyles}
          />
        )}
      </div>

      <PDFCanvas
        pdfDoc={pdfDoc}
        pageNum={currentPage}
        loading={loading}
        setLoading={setLoading}
        onError={setError}
        styles={mergedStyles}
      />
    </div>
  );
};

export default PDFViewer;
